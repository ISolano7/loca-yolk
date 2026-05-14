#!/usr/bin/env node
/**
 * Prototype Boundary Guard — Standalone Edition
 * Evident Technologies LLC
 *
 * Validates that this repository meets the Evident Prototype Boundary Policy
 * before deployment. Runs automatically in CI and can be run locally.
 *
 * Usage:
 *   node scripts/boundary-check.mjs
 *
 * Environment:
 *   PROTOTYPE_GOVERNANCE_PROFILE  — profile name from governance-profiles.json
 *                                   (default: "prototype-static")
 *   EXPECTED_CNAME                — override expected CNAME value
 *                                   (default: value from governance profile)
 *
 * This is the standalone version of the Evident prototype boundary guard,
 * adapted from the Evident Technologies satellites monorepo for use in
 * client-owned, single-repository deployments.
 *
 * Source: github.com/Evident-Technologies/satellites
 * Path:   scripts/prototype-boundary-check.mjs
 * Adapted: 2026-05-14
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

// In this standalone repo the script lives at scripts/boundary-check.mjs
// so the repository root is one directory up from scripts/.
const root = path.resolve(scriptDir, "..");

// ─── Reporting helpers ────────────────────────────────────────────────────────

const failures = [];
const passes = [];

function check(condition, passMsg, failMsg) {
  if (condition) {
    passes.push(passMsg);
  } else {
    failures.push(failMsg);
  }
}

// ─── Governance profile ───────────────────────────────────────────────────────

const profilesPath = path.join(scriptDir, "governance-profiles.json");

if (!fs.existsSync(profilesPath)) {
  console.error(
    `[boundary-check] Governance profiles not found: ${profilesPath}`,
  );
  console.error(`  Expected: scripts/governance-profiles.json`);
  process.exit(1);
}

const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
const profileId =
  process.env.PROTOTYPE_GOVERNANCE_PROFILE ?? "prototype-static";
const profile = profiles[profileId];

if (!profile) {
  console.error(`[boundary-check] Unknown governance profile: "${profileId}"`);
  console.error(`  Available profiles: ${Object.keys(profiles).join(", ")}`);
  process.exit(1);
}

// ─── File helpers ─────────────────────────────────────────────────────────────

/**
 * Read a required file. If it does not exist, records a failure and returns
 * empty string so subsequent checks can safely proceed.
 */
function requireFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    failures.push(
      `Missing required file: ${description ?? path.relative(root, filePath)}`,
    );
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

// ─── Core file paths ──────────────────────────────────────────────────────────

const htmlPath = path.join(root, "index.html");
const cnamePath = path.join(root, "CNAME");
const nojekyllPath = path.join(root, ".nojekyll");
const deployWorkflowPath = path.join(
  root,
  ".github",
  "workflows",
  "deploy.yml",
);

const html = requireFile(htmlPath, "index.html");
const cname = requireFile(cnamePath, "CNAME");

// .nojekyll must exist (content is irrelevant — it is a marker file)
check(
  fs.existsSync(nojekyllPath),
  ".nojekyll marker file present",
  "Missing .nojekyll — GitHub Pages may incorrectly process files as Jekyll templates",
);

// ─── HTML: required markers ───────────────────────────────────────────────────

if (html) {
  for (const marker of profile.requiredMarkers) {
    check(
      html.includes(marker),
      `Required prototype marker present: "${marker}"`,
      `Required prototype marker missing: "${marker}"`,
    );
  }

  // ─── HTML: forbidden surfaces ──────────────────────────────────────────────

  for (const item of profile.forbiddenPatterns) {
    const re = new RegExp(item.regex, "i");
    check(
      !re.test(html),
      `Forbidden surface absent: ${item.name}`,
      `Forbidden surface detected: ${item.name}  (pattern: ${item.regex})`,
    );
  }

  // ─── HTML: outbound URL whitelist ──────────────────────────────────────────

  const urls = [...html.matchAll(/https?:\/\/[^\s"'<>`]+/g)].map((m) => m[0]);
  const allowedUrls = new Set(profile.allowedOutboundUrls ?? []);
  const disallowed = urls.filter((u) => !allowedUrls.has(u));

  check(
    disallowed.length === 0,
    "No third-party outbound URLs present in prototype HTML",
    [
      "Disallowed outbound URLs found in prototype HTML:",
      ...disallowed.map((u) => `  ${u}`),
      "  Add approved URLs to governance-profiles.json > allowedOutboundUrls",
    ].join("\n"),
  );

  // ─── HTML: accessibility requirements ─────────────────────────────────────

  check(
    html.includes(":focus-visible"),
    "Focus-visible styles present (keyboard accessibility)",
    "Focus-visible styles missing — required for keyboard accessibility",
  );

  check(
    html.includes("@media (prefers-reduced-motion: reduce)"),
    "Reduced-motion media query present",
    "Reduced-motion media query missing — required for accessibility and governance",
  );

  // ─── HTML: security requirements ──────────────────────────────────────────

  check(
    html.includes("Content-Security-Policy") ||
      html.includes("content-security-policy"),
    "Content-Security-Policy marker present",
    "Content-Security-Policy missing — add a CSP <meta> tag to index.html",
  );

  // ─── HTML: heading structure ───────────────────────────────────────────────

  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) =>
    Number(m[1]),
  );

  check(
    headingLevels.length > 0,
    "Heading structure present",
    "No headings found in prototype HTML",
  );

  if (headingLevels.length > 0) {
    check(
      headingLevels[0] === 1,
      "Document heading starts at h1",
      `Document heading must start at h1 — found h${headingLevels[0]}`,
    );

    for (let i = 1; i < headingLevels.length; i++) {
      const prev = headingLevels[i - 1];
      const current = headingLevels[i];
      if (current - prev > 1) {
        failures.push(
          `Heading level jump detected: h${prev} → h${current} (no heading levels may be skipped)`,
        );
        break;
      }
    }
  }
}

// ─── CNAME validation ─────────────────────────────────────────────────────────

if (cname) {
  const cnameValue = cname.trim();

  check(
    cnameValue.length > 0,
    "CNAME file is non-empty",
    "CNAME file is empty",
  );

  // Validate against expected domain (profile value, overrideable via env var)
  const expectedCname = process.env.EXPECTED_CNAME ?? profile.expectedCname;

  if (expectedCname) {
    check(
      cnameValue === expectedCname,
      `CNAME matches expected domain: ${expectedCname}`,
      [
        `CNAME mismatch:`,
        `  Expected: "${expectedCname}"`,
        `  Found:    "${cnameValue}"`,
        `  If the domain has changed, update governance-profiles.json > expectedCname`,
        `  or set EXPECTED_CNAME env var to override.`,
      ].join("\n"),
    );
  }
}

// ─── Deploy workflow validation ───────────────────────────────────────────────

if (fs.existsSync(deployWorkflowPath)) {
  const deployWorkflow = fs.readFileSync(deployWorkflowPath, "utf8");

  check(
    /upload-pages-artifact/.test(deployWorkflow),
    "Deploy workflow includes GitHub Pages artifact upload step",
    "Deploy workflow is missing upload-pages-artifact step",
  );

  // Guard against monorepo path drift — artifact must be served from repo root
  check(
    !/path:\s+apps\//.test(deployWorkflow),
    "Deploy workflow uses repository-root artifact path (no monorepo path drift)",
    [
      "Deploy workflow artifact path contains 'apps/' — this is a monorepo path.",
      "  Update the upload-pages-artifact 'path:' value to '.' (repository root).",
    ].join("\n"),
  );

  check(
    !/\bwrangler\b/i.test(deployWorkflow),
    "Deploy workflow contains no Wrangler/Cloudflare deploy calls",
    "Deploy workflow includes a wrangler call — this repo deploys via GitHub Pages only, not Cloudflare Pages",
  );
} else {
  // Deploy workflow is not required locally — only warn
  console.warn(
    `[boundary-check] WARN: Deploy workflow not found at .github/workflows/deploy.yml`,
  );
  console.warn(
    `  This is acceptable for local content preview but must exist before deployment.`,
  );
}

// ─── Summary report ───────────────────────────────────────────────────────────

const divider = "─".repeat(60);

console.log(`\nPrototype Boundary Check`);
console.log(`Profile: ${profileId}`);
console.log(divider);

for (const line of passes) {
  console.log(`  ✓  ${line}`);
}

if (failures.length > 0) {
  console.log("");
  for (const line of failures) {
    // Multi-line failure messages need indentation on continuation lines
    const [first, ...rest] = line.split("\n");
    console.error(`  ✗  ${first}`);
    for (const continuation of rest) {
      console.error(`     ${continuation}`);
    }
  }
}

console.log(divider);

if (failures.length > 0) {
  console.error(
    `\n  ${failures.length} check(s) FAILED — deployment blocked.\n`,
  );
  process.exit(1);
}

console.log(`\n  All ${passes.length} checks passed.\n`);

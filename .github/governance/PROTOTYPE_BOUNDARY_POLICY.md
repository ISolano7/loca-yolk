# Prototype Boundary Policy

**Managed by:** Evident Technologies LLC
**Applies to:** ISolano7/loca-yolk
**Profile in effect:** `prototype-static`
**Policy version:** 1.0.0
**Effective date:** 2026-05-14

---

## What This Policy Does

This policy governs what this repository is permitted to do and deploy. It is automatically enforced by `scripts/boundary-check.mjs` during every CI run. A deployment cannot succeed if any rule in this policy is violated.

The policy exists to ensure this prototype:

1. Remains clearly identified as a demo interface (not a production application)
2. Does not inadvertently collect user data
3. Does not introduce third-party tracking or analytics
4. Meets minimum accessibility requirements
5. Maintains a secure baseline

---

## Permitted

- Static HTML, CSS, and inline SVG
- Decorative JavaScript (animations, visual effects) that make no network calls
- SVG namespace declarations (`http://www.w3.org/2000/svg`)
- Self-contained fonts loaded via inline `@font-face` (no external font CDN)

## Prohibited

| Category               | Examples                                              | Reason                              |
| ---------------------- | ----------------------------------------------------- | ----------------------------------- |
| Network requests       | `fetch()`, `XMLHttpRequest`, `sendBeacon()`           | No data transmission from prototype |
| Browser storage        | `localStorage`, `sessionStorage`, `document.cookie`   | No persistence of any kind          |
| Analytics and tracking | `gtag`, `mixpanel`, `posthog`, `segment`, `plausible` | No data collection                  |
| Form surfaces          | `<form>`, `action=`, `method=` attributes             | No data submission                  |

## Required

| Requirement                      | Enforcement                                           |
| -------------------------------- | ----------------------------------------------------- |
| Prototype watermark markers      | 5 specific string markers must appear in `index.html` |
| Focus-visible styles             | `:focus-visible` CSS rule required                    |
| Reduced-motion media query       | `@media (prefers-reduced-motion: reduce)` required    |
| Content-Security-Policy meta tag | CSP header tag required in `<head>`                   |
| Logical heading structure        | Headings must start at h1, no level jumps             |

---

## Governance Script

The boundary check runs as:

```bash
node scripts/boundary-check.mjs
```

To run locally before committing:

```bash
node scripts/boundary-check.mjs
```

This produces a pass/fail report. A non-zero exit code blocks deployment.

---

## Changing This Policy

Policy changes require a pull request with:

- Review approval from `@ISolano7` (repository owner)
- Review approval from `@DevonTyler` (Evident Technologies, infrastructure manager)
- Updated `scripts/governance-profiles.json` matching the policy change

No unilateral policy changes by either party.

---

## Escalation

Questions about this policy: devon@evident.icu

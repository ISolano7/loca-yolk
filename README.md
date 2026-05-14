# Loca Yolk

American-Mexican Breakfast & Lunch — demo prototype

**Live site:** https://loca-yolk.evidtech.com
**Built by:** [Evident Technologies LLC](https://evident.icu)

---

## About This Repository

This repository contains the prototype website for Loca Yolk. It deploys automatically to GitHub Pages when changes are pushed to the `main` branch.

**Repository owner:** @ISolano7
**Infrastructure:** Managed by Evident Technologies LLC (@DevonTyler)

---

## Viewing the Site Locally

No build tools required. To preview locally:

```bash
# Option 1 — npx serve (recommended)
npx serve .

# Option 2 — Python (if installed)
python3 -m http.server 8080

# Then open: http://localhost:3000 (serve) or http://localhost:8080 (python)
```

---

## How Deployments Work

1. Push a change to the `main` branch (or open a pull request and merge it).
2. GitHub Actions automatically runs the deployment workflow.
3. The governance guard runs first — it checks that the prototype stays within approved boundaries.
4. If the guard passes, the site is deployed to GitHub Pages.
5. Your changes are live at https://loca-yolk.evidtech.com within 1–3 minutes.

You can monitor deployments at: **Actions** tab → **Deploy Prototype**

---

## How to Request Changes

Open a pull request:

1. Create a new branch from `main`.
2. Make your changes to `index.html`.
3. Open a pull request targeting `main`.
4. Request review from @DevonTyler.

Alternatively, contact devon@evident.icu to discuss changes.

---

## Governance

This prototype is governed by the [Prototype Boundary Policy](.github/governance/PROTOTYPE_BOUNDARY_POLICY.md). The automated governance guard (`scripts/boundary-check.mjs`) runs before every deployment and will block any deploy that introduces prohibited surfaces (analytics, form submissions, network requests, etc.).

This is intentional — this is a demo prototype, not a production application.

---

## Managed Relationship

See [MANAGED_RELATIONSHIP.md](.github/governance/MANAGED_RELATIONSHIP.md) for the full description of what Evident Technologies controls, what you control, and how to exit this arrangement.

**Short version:** You own everything. Evident operates it.

---

## Support

**Devon Tyler Barber** — devon@evident.icu
**Evident Technologies LLC** — https://evident.icu

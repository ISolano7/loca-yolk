# Changelog

All notable changes to this repository are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-05-14

### Added

- Initial prototype — Loca Yolk American-Mexican Breakfast & Lunch demo interface
- GitHub Pages deployment workflow with governance enforcement
- Prototype boundary guard (`scripts/boundary-check.mjs`) adapted for standalone use
- Governance profile (`scripts/governance-profiles.json`) — `prototype-static` rules
- `CODEOWNERS` — joint approval required for infrastructure and content changes
- `SECURITY.md` — security disclosure policy
- `.github/governance/PROTOTYPE_BOUNDARY_POLICY.md` — governance rules
- `.github/governance/MANAGED_RELATIONSHIP.md` — client engagement terms
- Deployment provenance manifests — auto-generated audit record for every deploy
- Post-deploy DNS and TLS diagnostics saved as GitHub Actions artifacts

### Source

Prototype HTML extracted from:

```
Repository: Evident-Technologies/satellites
Branch:     loca-yolk
Path:       apps/loca-yolk/
Extracted:  2026-05-14
```

Migration performed by Devon Tyler Barber (devon@evident.icu), Evident Technologies LLC.

This repository begins with a fresh git history. The full development history
is available on request from Evident Technologies LLC.

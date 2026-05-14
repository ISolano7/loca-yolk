# Managed Relationship

**Repository:** ISolano7/loca-yolk
**Client:** Ivan Solano
**Agency:** Evident Technologies LLC
**Relationship type:** Managed client satellite — prototype deployment
**Effective date:** 2026-05-14

---

## Ownership and Control

This repository belongs to you, Ivan. Your GitHub account (`@ISolano7`) is the authoritative owner of all code, history, deployments, and infrastructure associated with this project.

Evident Technologies LLC contributes expertise and maintains the deployment infrastructure as a collaborator — not as an owner.

### Quick Reference: Who Controls What

| Asset                                             | Owner                                  | Evident's Role                                    |
| ------------------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| GitHub repository                                 | @ISolano7                              | Admin collaborator (can be revoked)               |
| GitHub account (ISolano7)                         | Ivan                                   | No access — Ivan's personal account               |
| GitHub Pages hosting                              | Automated by GitHub via Ivan's account | Configures via workflow                           |
| Custom domain (evidtech.com subdomains)           | Evident Technologies LLC               | Provides during transition period                 |
| Custom domain (your own domain, if/when acquired) | Ivan                                   | No control — advisory only                        |
| Repository code and history                       | Ivan                                   | Commits are attributed to individual contributors |
| GitHub Actions compute                            | Ivan's GitHub account                  | Authors and maintains workflow files              |
| SSL/HTTPS certificate                             | GitHub (auto-issued)                   | No control — automatic                            |

---

## What Evident Does

During this engagement, Evident Technologies LLC:

- Maintains the deployment workflow (`.github/workflows/deploy.yml`)
- Maintains the governance/boundary enforcement scripts (`scripts/`)
- Reviews and approves pull requests touching infrastructure files
- Monitors deployment health and investigates failures
- Documents all operational procedures

---

## What Evident Does Not Do

Evident Technologies LLC does not:

- Own, hold, or retain your GitHub account credentials
- Control your GitHub account billing, plan, or settings
- Have access to any domain you independently register and manage
- Have authority to unilaterally change your repository settings
- Make deployments without your knowledge (every deploy is triggered by a push to `main` or an explicit manual dispatch — all are visible in your Actions tab)

---

## Your Rights at Any Time

You can, at any time and without notice:

1. **Revoke Devon's collaborator access** via GitHub → Settings → Collaborators → Remove
2. **Disable or delete any workflow** via GitHub → Settings → Actions
3. **Change the custom domain** by editing the `CNAME` file and your DNS records
4. **Fork or archive the repository** — your code is always yours
5. **Stop this engagement entirely** — the repository continues working without Evident

None of these actions require Evident's approval or cooperation.

---

## Domain Situation (Current)

The live site currently uses a domain managed by Evident Technologies LLC:

```
loca-yolk.evidtech.com  →  ISolano7.github.io
```

This is a **transitional arrangement** — it is not a long-term solution. The DNS entry lives in Evident's Cloudflare account. If Evident Technologies LLC ceased to operate, this domain entry would eventually expire and the custom domain would stop resolving (though the site itself at `ISolano7.github.io` would continue working).

### Moving to Your Own Domain

When you are ready to own your domain:

1. Register a domain at Namecheap, Cloudflare, Google Domains, or similar (approximately $12–$15/year for a `.com`).
2. Create a DNS CNAME record: `your-subdomain → ISolano7.github.io`
3. Update the `CNAME` file in this repository to your new domain.
4. Update `scripts/governance-profiles.json` → `expectedCname` field.
5. Configure the custom domain in GitHub → Settings → Pages.
6. Evident will remove the evidtech.com DNS entry once your domain resolves.

This transition is zero-downtime if done in the correct order. Evident will assist at no additional charge during the engagement period.

---

## Exit Process

This engagement ends when either party chooses. The standard exit sequence:

```
1. Final deployment confirmed working
2. (Optional) DNS migrated to client-owned domain
3. Devon (@DevonTyler) removed from collaborators
4. CODEOWNERS file updated to remove @DevonTyler
5. Final CHANGELOG entry added documenting the transition
6. Evident removes the evidtech.com DNS subdomain (or redirects)
```

After exit, the repository continues to work exactly as before. GitHub Actions workflows continue running. GitHub Pages continues serving the site. Your content and history are unaffected.

---

## Contact

**Devon Tyler Barber**
Manager, Evident Technologies LLC
devon@evident.icu
GitHub: @DevonTyler

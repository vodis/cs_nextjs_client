# Development guide — cs_nextjs_client

This document covers local development, branch/CI conventions, and the **staging orchestrator** pipeline (GHCR polling). Use it alongside [README.md](./README.md) for generic Next.js boilerplate.

---

## Branch model

| Branch | Purpose | CI workflow | Deploy |
|--------|---------|-------------|--------|
| `develop` | Day-to-day integration | [build-dev.yml](./.github/workflows/build-dev.yml) — lint, format, typecheck, test, build on PR/push | **No auto-deploy** (legacy SFTP/SSH steps are disabled) |
| `staging` | Pre-production / orchestrator intake | [build-staging.yml](./.github/workflows/build-staging.yml) | **cs_orchestrator** polls GHCR and deploys |
| `master` | Production | [build-prod.yml](./.github/workflows/build-prod.yml) — build checks only (no container publish in this repo yet) | Out of scope for this guide |

**Important:** Staging artifacts always declare `git.branch: "staging"`. Builds that should feed staging must land on the **`staging`** branch (merge `develop` → `staging`, or commit directly to `staging`). Do not point the orchestrator catalog at `develop` unless you intentionally change both CI triggers and orchestrator config.

Typical flow:

```text
feature/* → develop (PR + build-dev) → staging (PR lint + push bundle) → orchestrator deploy
```

---

## Staging pipeline (orchestrator contract)

### Architecture

```text
cs_nextjs_client CI  →  GHCR (app image + metadata artifact)
cs_orchestrator      →  polls GHCR tags  →  validates  →  deploys
```

There is **no webhook** and **no SSH/SFTP deploy** from staging CI. Normal staging deploy must not mutate Docker/Nginx on the server from this repository.

### GHCR outputs (on push to `staging` or `workflow_dispatch`)

| Tag | Type | Role |
|-----|------|------|
| `ghcr.io/vodis/cs_nextjs_client:staging` | Container image | Runnable app (also `:staging-<sha>` for traceability) |
| `ghcr.io/vodis/cs_nextjs_client:staging-metadata` | OCI artifact (ORAS) | `deploy-metadata.json` with media type `application/vnd.craftscript.deploy-metadata.v1+json` |

Orchestrator service id: **`staging-craftscript`**, environment: **`staging`**.

### `deploy-metadata.json` schema (v1)

Produced on every successful `staging-bundle` run. Example shape:

```json
{
  "schemaVersion": "1",
  "service": "staging-craftscript",
  "environment": "staging",
  "git": {
    "repository": "https://github.com/vodis/cs_nextjs_client.git",
    "commitSha": "<40-char sha>",
    "branch": "staging",
    "actor": "<github.actor>"
  },
  "image": {
    "registry": "ghcr.io",
    "repository": "vodis/cs_nextjs_client",
    "digest": "sha256:<64 hex>"
  },
  "security": {
    "sbomUri": "<GitHub Actions run — SBOM artifact>",
    "scanSummaryUri": "<GitHub Actions run — Trivy artifact>",
    "signatureRef": "ghcr.io/vodis/cs_nextjs_client@<digest>"
  },
  "build": {
    "pipelineId": "<run id>",
    "pipelineUrl": "<run url>",
    "builtAt": "<UTC ISO8601>"
  }
}
```

SBOM and scan summaries are also uploaded as **GitHub Actions artifacts** (`staging-deploy-bundle-<sha>`) for audit; the orchestrator’s primary intake is GHCR.

### CI job split

| Event | Job | Behavior |
|-------|-----|----------|
| PR → `staging` | `staging-pr-checks` | Lint only — **no** image push, **no** ORAS |
| Push / `workflow_dispatch` → `staging` | `staging-bundle` | Lint → Docker build/push → Syft SBOM → Trivy → metadata → ORAS push → artifact upload |

### Break-glass

- **Do not** re-enable direct server deploy in this repo for staging without team agreement.
- Emergency options: manual server intervention, or `workflow_dispatch` on **Build STAGING - Frontend** after review (still publishes to GHCR only; orchestrator performs the actual deploy).

---

## Local development

### Prerequisites

- **Node.js 24** (see [.nvmrc](./.nvmrc))
- **pnpm 10.15.0** (via Corepack: `corepack enable && corepack prepare pnpm@10.15.0 --activate`)

### Private package `@vodis/ui-kit`

GitHub Packages requires a PAT with `read:packages`. For local installs:

```bash
# One-time: create ~/.npm-token with your PAT (no newline)
echo "@vodis:registry=https://npm.pkg.github.com/" >> .npmrc
printf '//npm.pkg.github.com/:_authToken=%s\n' "$(cat ~/.npm-token)" >> .npmrc
```

In GitHub Actions, the same token is stored as repository secret **`NPM_TOKEN`**.

### Environment

Copy [.env.example](./.env.example) to `.env` and set:

```bash
NEXT_PUBLIC_API_BASE_URL=<your API base URL>
```

### Common commands

```bash
pnpm install --frozen-lockfile
pnpm run dev          # http://localhost:3000
pnpm run build
pnpm run start
pnpm run lint         # local (may write fixes)
pnpm run format:check
pnpm run typecheck
pnpm test
```

CI staging uses **lint without `--fix`** (`pnpm exec eslint ... --max-warnings 0`).

### Docker image (matches CI)

Requires BuildKit and the npm token secret (same as [Dockerfile](./Dockerfile)):

```bash
echo "$GITHUB_PAT_WITH_READ_PACKAGES" > /tmp/npm-token
docker buildx build \
  --secret id=npm_token,src=/tmp/npm-token \
  -t cs_nextjs_client:local \
  .
docker run --rm -p 3000:3000 cs_nextjs_client:local
```

---

## GitHub repository setup

### Required secret

| Secret | Purpose |
|--------|---------|
| `NPM_TOKEN` | PAT with `read:packages` for `@vodis/ui-kit` (CI + Docker build) |

### Workflow permissions

`build-staging.yml` needs `packages: write` and `id-token: write` (already declared) so `GITHUB_TOKEN` can push images and ORAS artifacts to GHCR.

### Package visibility

Ensure the GHCR package `vodis/cs_nextjs_client` allows:

- CI push from this repository
- **cs_orchestrator** read/poll access (org token or deploy credentials on the orchestrator host)

---

## Follow-up checklist

Use this list after merging staging CI changes and before relying on orchestrator deploys.

### Repository (cs_nextjs_client)

- [ ] Merge workflow changes into **`staging`** (workflow file must exist on that branch to run).
- [ ] Confirm **`NPM_TOKEN`** is set under repository → Settings → Secrets.
- [ ] Run **Build STAGING - Frontend** via push to `staging` or `workflow_dispatch`.
- [ ] Verify workflow **staging-bundle** completes (green).
- [ ] On GHCR, confirm tags exist:
  - [ ] `staging` (container)
  - [ ] `staging-metadata` (OCI artifact)
- [ ] Pull metadata locally (optional smoke test):

  ```bash
  oras pull ghcr.io/vodis/cs_nextjs_client:staging-metadata -o /tmp/staging-meta
  cat /tmp/staging-meta/deploy-metadata.json
  ```

- [ ] Confirm `deploy-metadata.json` fields: `service` = `staging-craftscript`, `git.branch` = `staging`, `image.digest` matches `docker buildx imagetools inspect ghcr.io/vodis/cs_nextjs_client:staging`.

### Orchestrator (cs_orchestrator)

- [ ] Catalog entry uses service id **`staging-craftscript`** (not legacy names such as `marketing-web`).
- [ ] Poll source configured for:
  - [ ] `ghcr.io/vodis/cs_nextjs_client:staging`
  - [ ] `ghcr.io/vodis/cs_nextjs_client:staging-metadata`
- [ ] Parser accepts media type **`application/vnd.craftscript.deploy-metadata.v1+json`**.
- [ ] Deploy logic uses **`image.digest`** (immutable), not only the mutable `:staging` tag.
- [ ] End-to-end test: push to `staging` → orchestrator detects new metadata → staging host updated → smoke URL/health check passes.

### Process / documentation

- [ ] Team agrees: **`develop`** = integration only; **`staging`** = orchestrator releases.
- [ ] Remove or archive any runbooks that describe SSH/npm deploy to staging from this repo.
- [ ] When production container publish is added, mirror this pattern (separate tag + metadata artifact + orchestrator service id).

### Future improvements (optional)

- [ ] Fail Trivy on critical CVEs (`exit-code: '1'`) once baseline is clean.
- [ ] Cosign/keyless signing and point `security.signatureRef` at attestation URI.
- [ ] Publish SBOM/scan as additional GHCR artifacts if orchestrator should consume them without GitHub Actions URLs.
- [ ] Align **build-prod.yml** with the same GHCR + ORAS model when production orchestrator intake is ready.

---

## Workflow reference

| File | Trigger | Notes |
|------|---------|-------|
| [.github/workflows/build-dev.yml](./.github/workflows/build-dev.yml) | `develop`, `releases/**` | PR checks + push checks; SFTP deploy commented out |
| [.github/workflows/build-staging.yml](./.github/workflows/build-staging.yml) | `staging` | GHCR app + metadata; orchestrator intake |
| [.github/workflows/build-prod.yml](./.github/workflows/build-prod.yml) | `master` | npm-based build/test only |

---

## Troubleshooting

| Symptom | Likely cause | Action |
|---------|----------------|--------|
| `NPM_TOKEN` error in CI | Missing or expired secret | Add/rotate PAT with `read:packages` |
| Docker build fails on `@vodis/ui-kit` | Secret not passed to BuildKit | Check `secrets: npm_token=...` in build-staging |
| ORAS push 403/401 | `packages: write` or GHCR permissions | Check workflow permissions and package settings |
| Workflow not running on push | Workflow not on `staging` branch | Merge `.github/workflows/build-staging.yml` into `staging` |
| Orchestrator never deploys | Poll config or wrong service id | Verify orchestrator watches `staging` + `staging-metadata` and catalog `staging-craftscript` |
| `git.branch` mismatch | Build not from `staging` | Merge to `staging` before expecting orchestrator pickup |

For questions about orchestrator behavior (poll interval, validation rules, nginx layout), see **cs_orchestrator** documentation and catalog config—not this repo.

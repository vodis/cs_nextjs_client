# AGENTS

Rules for AI agents working in this repository:

- Use `develop` as the default base branch for feature, fix, and docs work.
- Before starting changes, fetch `origin/develop`, switch to local `develop`,
  fast-forward it, then create a scoped task branch from `develop`.
- Open pull requests back to `develop` unless the user explicitly requests a
  release or hotfix flow.
- Use HTTPS GitHub remotes/commands with the `vodis-bot` account for pushes and
  pull requests. Do not rely on SSH remotes for publication because host SSH
  keys may be read-only.

## Shared asset SDK and ownership

This marketing app owns public content and display. Consume backend metadata for product data; never infer native assets from symbols or copy provider alias tables. Do not add wallet verification, signing or an asset SDK dependency unless a concrete product feature needs it.

Read the canonical [asset and cryptographic responsibilities](https://github.com/vodis/cs_orchestrator/blob/main/docs/architecture/asset-and-crypto-responsibilities.md)
before changing these boundaries. `@vodis/cs-assets` owns pure network identities
and chain-scoped provider normalization; backend policy and proof acceptance
remain server-side. The package must be released before consumers pin it; do
not duplicate its mappings or import browser MFE internals into a server.

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

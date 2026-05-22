import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/** @returns {number} negative if a < b, 0 if equal, positive if a > b */
export function compareSemver(a, b) {
  const pa = parseSemver(a);
  const pb = parseSemver(b);

  for (const key of ['major', 'minor', 'patch']) {
    if (pa[key] !== pb[key]) {
      return pa[key] - pb[key];
    }
  }

  if (pa.prerelease === pb.prerelease) {
    return 0;
  }
  if (pa.prerelease === null) {
    return 1;
  }
  if (pb.prerelease === null) {
    return -1;
  }
  return pa.prerelease.localeCompare(pb.prerelease);
}

export function parseSemver(version) {
  const match =
    /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/.exec(
      version,
    );
  if (!match) {
    throw new Error(`Invalid semver: ${version}`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? null,
    build: match[5] ?? null,
  };
}

function readVersionFromGit(ref) {
  const raw = execSync(`git show ${ref}:package.json`, { encoding: 'utf8' });
  return JSON.parse(raw).version;
}

function resolveBaseVersion() {
  const baseSha = process.env.BASE_SHA?.trim();
  if (baseSha) {
    return readVersionFromGit(baseSha);
  }

  const baseRef = process.env.GITHUB_BASE_REF?.trim() || 'master';
  return readVersionFromGit(`origin/${baseRef}`);
}

function main() {
  const headVersion = JSON.parse(readFileSync('package.json', 'utf8')).version;
  let baseVersion;

  try {
    baseVersion = resolveBaseVersion();
  } catch (err) {
    console.error(
      '::error::Could not read base package.json. Ensure git history includes the PR base ref.',
    );
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  let cmp;
  try {
    cmp = compareSemver(headVersion, baseVersion);
  } catch (err) {
    console.error(`::error::${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }

  if (cmp <= 0) {
    console.error(
      `::error::package.json version must be greater than master (${baseVersion}). Current: ${headVersion}. Bump semver in this PR before merge.`,
    );
    process.exit(1);
  }

  console.log(
    `Release version OK: ${baseVersion} → ${headVersion} (PR targets master)`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

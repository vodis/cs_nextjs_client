import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareSemver, parseSemver } from './check-version-bump.mjs';

test('parseSemver parses release and prerelease', () => {
  assert.deepEqual(parseSemver('1.2.3'), {
    major: 1,
    minor: 2,
    patch: 3,
    prerelease: null,
    build: null,
  });
  assert.deepEqual(parseSemver('1.2.3-rc.1'), {
    major: 1,
    minor: 2,
    patch: 3,
    prerelease: 'rc.1',
    build: null,
  });
});

test('compareSemver orders versions', () => {
  assert.ok(compareSemver('0.2.0', '0.1.0') > 0);
  assert.ok(compareSemver('1.0.0', '0.9.9') > 0);
  assert.equal(compareSemver('1.0.0', '1.0.0'), 0);
  assert.ok(compareSemver('1.0.0', '1.0.0-rc.1') > 0);
  assert.ok(compareSemver('1.0.0-rc.2', '1.0.0-rc.1') > 0);
});

test('compareSemver rejects invalid versions', () => {
  assert.throws(() => parseSemver('not-a-version'), /Invalid semver/);
});

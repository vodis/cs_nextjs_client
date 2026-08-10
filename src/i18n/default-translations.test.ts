import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { defaultTranslations } from '@src/stores/reducers/i18n/default';

const SRC_DIR = join(process.cwd(), 'src');
const TRANSLATION_KEY_PATTERN = /Texts\.[A-Za-z0-9-]+/g;

describe('default translations', () => {
  it('cover every translation key referenced in source files', () => {
    const usedKeys = new Set<string>();

    for (const filePath of walkFiles(SRC_DIR)) {
      if (!/\.(ts|tsx)$/.test(filePath) || filePath.endsWith('.test.ts')) {
        continue;
      }

      const source = readFileSync(filePath, 'utf8');
      const matches = source.matchAll(TRANSLATION_KEY_PATTERN);

      for (const match of matches) {
        usedKeys.add(match[0]);
      }
    }

    const missingKeys = [...usedKeys].filter(
      (key) => !defaultTranslations[key as keyof typeof defaultTranslations],
    );

    expect(missingKeys).toEqual([]);
  });
});

function walkFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const filePath = join(directory, entry);
    const stats = statSync(filePath);

    return stats.isDirectory() ? walkFiles(filePath) : filePath;
  });
}

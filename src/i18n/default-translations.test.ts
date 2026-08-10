import { describe, expect, it } from 'vitest';

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { defaultTranslations } from '@src/stores/reducers/i18n/default';

const SRC_DIR = join(process.cwd(), 'src');
const TRANSLATION_KEY_PATTERN = /Texts\.[A-Za-z0-9-]+/g;

describe('default translations', () => {
  it('cover every translation key referenced in source files', () => {
    expect(collectMissingTranslationKeys(SRC_DIR, defaultTranslations)).toEqual(
      [],
    );
  });

  it('passes when mocked source keys exist in provided translations', () => {
    const missingKeys = collectMissingTranslationKeys(
      '/mock-src',
      {
        'Texts.side-menu-home': 'Home',
        'Texts.content-about-title': 'About CraftScript',
      },
      {
        readDirectory: (directory) =>
          directory === '/mock-src' ? ['page.tsx'] : [],
        readFile: () =>
          [
            "translate(translations, 'Texts.side-menu-home')",
            "translate(translations, 'Texts.content-about-title')",
          ].join('\n'),
        isDirectory: () => false,
        joinPath: (...parts) => parts.join('/'),
      },
    );

    expect(missingKeys).toEqual([]);
  });
});

interface IFileSystemReader {
  readDirectory: (directory: string) => string[];
  readFile: (filePath: string) => string;
  isDirectory: (filePath: string) => boolean;
  joinPath: (...parts: string[]) => string;
}

function collectMissingTranslationKeys(
  sourceDirectory: string,
  translations: Record<string, string>,
  fileSystem: IFileSystemReader = nodeFileSystem,
): string[] {
  const usedKeys = new Set<string>();

  for (const filePath of walkFiles(sourceDirectory, fileSystem)) {
    if (!/\.(ts|tsx)$/.test(filePath) || filePath.endsWith('.test.ts')) {
      continue;
    }

    const source = fileSystem.readFile(filePath);
    const matches = source.matchAll(TRANSLATION_KEY_PATTERN);

    for (const match of matches) {
      usedKeys.add(match[0]);
    }
  }

  return [...usedKeys].filter((key) => !translations[key]);
}

const nodeFileSystem: IFileSystemReader = {
  readDirectory: readdirSync,
  readFile: (filePath) => readFileSync(filePath, 'utf8'),
  isDirectory: (filePath) => statSync(filePath).isDirectory(),
  joinPath: join,
};

function walkFiles(
  directory: string,
  fileSystem: IFileSystemReader = nodeFileSystem,
): string[] {
  return fileSystem.readDirectory(directory).flatMap((entry) => {
    const filePath = fileSystem.joinPath(directory, entry);

    return fileSystem.isDirectory(filePath)
      ? walkFiles(filePath, fileSystem)
      : filePath;
  });
}

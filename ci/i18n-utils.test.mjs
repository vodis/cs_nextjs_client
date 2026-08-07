import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

async function importTranspiledModule(
  sourcePath,
  outputPath,
  transform = (code) => code,
) {
  const source = transform(await readFile(sourcePath, 'utf8'));
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2020,
      target: ts.ScriptTarget.ES2020,
    },
  });

  await writeFile(outputPath, transpiled.outputText);

  return import(pathToFileURL(outputPath));
}

test('locale utilities normalize and map supported locales', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'cs-nextjs-i18n-'));
  const locales = await importTranspiledModule(
    'src/i18n/locales.ts',
    path.join(tempDir, 'locales.mjs'),
  );

  assert.deepEqual(locales.SUPPORTED_LOCALES, ['en', 'ua', 'pt']);
  assert.deepEqual(locales.SUPPORTED_LANGUAGES, ['EN', 'UA', 'PT']);
  assert.equal(locales.localeToLanguage('ua'), 'UA');
  assert.equal(locales.languageToLocale('PT'), 'pt');
  assert.equal(locales.getPreferredLocale('UA'), 'ua');
  assert.equal(locales.getPreferredLocale('pt'), 'pt');
  assert.equal(locales.getPreferredLocale(undefined), 'en');
  assert.equal(locales.normalizeLanguage('pt'), 'PT');
  assert.equal(locales.normalizeLanguage('missing'), 'EN');
  assert.equal(locales.isLocaleSlug('en'), true);
  assert.equal(locales.isLocaleSlug('de'), false);
  assert.equal(locales.isLanguageCode('UA'), true);
  assert.equal(locales.isLanguageCode('ua'), false);
});

test('locale path utilities preserve localized route shape', async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'cs-nextjs-i18n-'));
  const locales = await importTranspiledModule(
    'src/i18n/locales.ts',
    path.join(tempDir, 'locales.mjs'),
  );

  assert.equal(locales.getLocaleFromPathname('/ua/about'), 'ua');
  assert.equal(locales.getLocaleFromPathname('/about'), 'en');
  assert.equal(locales.getLanguageFromPathname('/pt/use-cases'), 'PT');
  assert.equal(locales.getLanguageFromPathname('/unknown'), 'EN');
  assert.equal(locales.stripLocaleFromPathname('/ua/about'), '/about');
  assert.equal(locales.stripLocaleFromPathname('/pt'), '/');
  assert.equal(locales.stripLocaleFromPathname('/use-cases'), '/use-cases');
  assert.equal(locales.withLocalePath('/about', 'ua'), '/ua/about');
  assert.equal(locales.withLocalePath('/en/about', 'pt'), '/pt/about');
  assert.equal(locales.withLocalePath('/', 'en'), '/en');
});

test('route metadata utilities emit canonical and alternate locale URLs', async () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://example.test';

  const tempDir = await mkdtemp(path.join(tmpdir(), 'cs-nextjs-i18n-'));
  await importTranspiledModule(
    'src/i18n/locales.ts',
    path.join(tempDir, 'locales.mjs'),
  );
  const routes = await importTranspiledModule(
    'src/i18n/routes.ts',
    path.join(tempDir, 'routes.mjs'),
    (code) => code.replaceAll('@src/i18n/locales', './locales.mjs'),
  );

  assert.equal(
    routes.absoluteUrl('/ua/about'),
    'https://example.test/ua/about',
  );
  assert.deepEqual(routes.LOCALIZED_ROUTE_PATHS, [
    '/',
    '/use-cases',
    '/ai',
    '/about',
  ]);

  const metadata = routes.buildLocalizedMetadata('/about', 'ua');

  assert.equal(metadata.alternates.canonical, 'https://example.test/ua/about');
  assert.equal(
    metadata.alternates.languages.en,
    'https://example.test/en/about',
  );
  assert.equal(
    metadata.alternates.languages.uk,
    'https://example.test/ua/about',
  );
  assert.equal(
    metadata.alternates.languages.pt,
    'https://example.test/pt/about',
  );
  assert.equal(
    metadata.alternates.languages['x-default'],
    'https://example.test/en/about',
  );
  assert.equal(metadata.openGraph.locale, 'uk');
  assert.equal(metadata.openGraph.url, 'https://example.test/ua/about');
});

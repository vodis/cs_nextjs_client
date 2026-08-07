import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_LOCALES,
  getLanguageFromPathname,
  getLocaleFromPathname,
  getPreferredLocale,
  isLanguageCode,
  isLocaleSlug,
  languageToLocale,
  localeToLanguage,
  normalizeLanguage,
  stripLocaleFromPathname,
  withLocalePath,
} from './locales';

test('locale utilities normalize and map supported locales', () => {
  assert.deepEqual(SUPPORTED_LOCALES, ['en', 'ua', 'pt']);
  assert.deepEqual(SUPPORTED_LANGUAGES, ['EN', 'UA', 'PT']);
  assert.equal(localeToLanguage('ua'), 'UA');
  assert.equal(languageToLocale('PT'), 'pt');
  assert.equal(getPreferredLocale('UA'), 'ua');
  assert.equal(getPreferredLocale('pt'), 'pt');
  assert.equal(getPreferredLocale(undefined), 'en');
  assert.equal(normalizeLanguage('pt'), 'PT');
  assert.equal(normalizeLanguage('missing'), 'EN');
  assert.equal(isLocaleSlug('en'), true);
  assert.equal(isLocaleSlug('de'), false);
  assert.equal(isLanguageCode('UA'), true);
  assert.equal(isLanguageCode('ua'), false);
});

test('locale path utilities preserve localized route shape', () => {
  assert.equal(getLocaleFromPathname('/ua/about'), 'ua');
  assert.equal(getLocaleFromPathname('/about'), 'en');
  assert.equal(getLanguageFromPathname('/pt/use-cases'), 'PT');
  assert.equal(getLanguageFromPathname('/unknown'), 'EN');
  assert.equal(stripLocaleFromPathname('/ua/about'), '/about');
  assert.equal(stripLocaleFromPathname('/pt'), '/');
  assert.equal(stripLocaleFromPathname('/use-cases'), '/use-cases');
  assert.equal(withLocalePath('/about', 'ua'), '/ua/about');
  assert.equal(withLocalePath('/en/about', 'pt'), '/pt/about');
  assert.equal(withLocalePath('/', 'en'), '/en');
});

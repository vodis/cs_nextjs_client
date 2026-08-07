import { describe, expect, it } from 'vitest';

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

describe('locale utilities', () => {
  it('normalizes and maps supported locales', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'ua', 'pt']);
    expect(SUPPORTED_LANGUAGES).toEqual(['EN', 'UA', 'PT']);
    expect(localeToLanguage('ua')).toBe('UA');
    expect(languageToLocale('PT')).toBe('pt');
    expect(getPreferredLocale('UA')).toBe('ua');
    expect(getPreferredLocale('pt')).toBe('pt');
    expect(getPreferredLocale(undefined)).toBe('en');
    expect(normalizeLanguage('pt')).toBe('PT');
    expect(normalizeLanguage('missing')).toBe('EN');
    expect(isLocaleSlug('en')).toBe(true);
    expect(isLocaleSlug('de')).toBe(false);
    expect(isLanguageCode('UA')).toBe(true);
    expect(isLanguageCode('ua')).toBe(false);
  });

  it('preserves localized route shape', () => {
    expect(getLocaleFromPathname('/ua/about')).toBe('ua');
    expect(getLocaleFromPathname('/about')).toBe('en');
    expect(getLanguageFromPathname('/pt/use-cases')).toBe('PT');
    expect(getLanguageFromPathname('/unknown')).toBe('EN');
    expect(stripLocaleFromPathname('/ua/about')).toBe('/about');
    expect(stripLocaleFromPathname('/pt')).toBe('/');
    expect(stripLocaleFromPathname('/use-cases')).toBe('/use-cases');
    expect(withLocalePath('/about', 'ua')).toBe('/ua/about');
    expect(withLocalePath('/en/about', 'pt')).toBe('/pt/about');
    expect(withLocalePath('/', 'en')).toBe('/en');
  });
});

export const DEFAULT_LOCALE = 'en';
export const DEFAULT_LANGUAGE = 'EN';

export const SUPPORTED_LOCALES = ['en', 'ua', 'pt'] as const;
export const SUPPORTED_LANGUAGES = ['EN', 'UA', 'PT'] as const;

export type LocaleSlug = (typeof SUPPORTED_LOCALES)[number];
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

const SUPPORTED_LOCALE_VALUES: readonly string[] = SUPPORTED_LOCALES;
const SUPPORTED_LANGUAGE_VALUES: readonly string[] = SUPPORTED_LANGUAGES;

export const LOCALE_TO_LANGUAGE: Record<LocaleSlug, LanguageCode> = {
  en: 'EN',
  ua: 'UA',
  pt: 'PT',
};

export const LANGUAGE_TO_LOCALE: Record<LanguageCode, LocaleSlug> = {
  EN: 'en',
  UA: 'ua',
  PT: 'pt',
};

export const LOCALE_HTML_LANG: Record<LocaleSlug, string> = {
  en: 'en',
  ua: 'uk',
  pt: 'pt',
};

export function isLocaleSlug(value: string | undefined): value is LocaleSlug {
  return value !== undefined && SUPPORTED_LOCALE_VALUES.includes(value);
}

export function isLanguageCode(
  value: string | undefined,
): value is LanguageCode {
  return value !== undefined && SUPPORTED_LANGUAGE_VALUES.includes(value);
}

export function localeToLanguage(locale: LocaleSlug): LanguageCode {
  return LOCALE_TO_LANGUAGE[locale];
}

export function languageToLocale(language: LanguageCode): LocaleSlug {
  return LANGUAGE_TO_LOCALE[language];
}

export function getPreferredLocale(language: string | undefined): LocaleSlug {
  return languageToLocale(normalizeLanguage(language));
}

export function normalizeLanguage(language: string | undefined): LanguageCode {
  const normalized = language?.toUpperCase();

  return isLanguageCode(normalized) ? normalized : DEFAULT_LANGUAGE;
}

export function getLocaleFromPathname(pathname: string): LocaleSlug {
  const [, maybeLocale] = pathname.split('/');

  return isLocaleSlug(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
}

export function getLanguageFromPathname(pathname: string): LanguageCode {
  return localeToLanguage(getLocaleFromPathname(pathname));
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  if (!isLocaleSlug(maybeLocale)) {
    return pathname || '/';
  }

  const stripped = `/${segments.slice(2).join('/')}`.replace(/\/+$/, '');
  return stripped || '/';
}

export function withLocalePath(pathname: string, locale: LocaleSlug): string {
  const normalizedPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`;
  const basePathname = stripLocaleFromPathname(normalizedPathname);

  return basePathname === '/' ? `/${locale}` : `/${locale}${basePathname}`;
}

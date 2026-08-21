import type { Metadata } from 'next';

import { translate } from '@src/i18n/translate';
import { defaultTranslations } from '@src/stores/reducers/i18n/default';
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  SUPPORTED_LOCALES,
  type LocaleSlug,
  withLocalePath,
} from '@src/i18n/locales';
import { getServerTranslations } from '@src/i18n/server';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://craftscript.com';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const LOCALIZED_ROUTE_PATHS = ['/', '/use-cases', '/ai', '/about'];

const ROUTE_METADATA_TRANSLATION_KEYS: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  '/': {
    title: 'Texts.metadata-home-title',
    description: 'Texts.metadata-home-description',
  },
  '/about': {
    title: 'Texts.metadata-about-title',
    description: 'Texts.metadata-about-description',
  },
  '/ai': {
    title: 'Texts.metadata-ai-title',
    description: 'Texts.metadata-ai-description',
  },
  '/use-cases': {
    title: 'Texts.metadata-use-cases-title',
    description: 'Texts.metadata-use-cases-description',
  },
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export async function buildLocalizedMetadata(
  pathname: string,
  locale: LocaleSlug = DEFAULT_LOCALE,
): Promise<Metadata> {
  const routeMetadata = await getRouteMetadata(pathname, locale);
  const canonicalPath = withLocalePath(pathname, locale);
  const languages = SUPPORTED_LOCALES.reduce<Record<string, string>>(
    (result, supportedLocale) => {
      result[LOCALE_HTML_LANG[supportedLocale]] = absoluteUrl(
        withLocalePath(pathname, supportedLocale),
      );
      return result;
    },
    {
      'x-default': absoluteUrl(withLocalePath(pathname, DEFAULT_LOCALE)),
    },
  );

  return {
    ...routeMetadata,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      ...routeMetadata,
      locale: LOCALE_HTML_LANG[locale],
      url: absoluteUrl(canonicalPath),
    },
  };
}

async function getRouteMetadata(pathname: string, locale: LocaleSlug) {
  const translationKeys =
    ROUTE_METADATA_TRANSLATION_KEYS[pathname] ??
    ROUTE_METADATA_TRANSLATION_KEYS['/'];
  const translations = await getServerTranslations(locale);

  return {
    title: translate(
      translations,
      translationKeys.title,
      translate(defaultTranslations, translationKeys.title),
    ),
    description: translate(
      translations,
      translationKeys.description,
      translate(defaultTranslations, translationKeys.description),
    ),
  };
}

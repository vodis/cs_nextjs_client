import type { Metadata } from 'next';

import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  SUPPORTED_LOCALES,
  type LocaleSlug,
  withLocalePath,
} from '@src/i18n/locales';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://craftscript.com';

export const LOCALIZED_ROUTE_PATHS = ['/', '/use-cases', '/ai', '/about'];

const ROUTE_METADATA: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  '/': {
    title:
      'CraftScript | Easy discovering of Web3 world together | DeFi and Dex in your hands',
    description:
      'Our aim is creating smart scripts in any smart contract programming languages and reach to the best market results in a world. Join to Craft Script team and participate in development at open source solutions.',
  },
  '/about': {
    title: 'About CraftScript | Pioneering Web3 Adoption and AI Innovation',
    description:
      "Learn about CraftScript's mission to drive widespread adoption of Web3 technologies across sectors. We seamlessly integrate Web3 innovations into business models, empowering clients to pioneer innovation and uphold digital privacy standards. As a digital engineering company, we craft cutting-edge solutions in symbiotic Web3 and AI ecosystems.",
  },
  '/ai': {
    title:
      'CraftScript | Revolutionizing Industries Through Human-AI Collaboration | AI Symbiosis',
    description:
      "Explore CraftScript's AI Symbiosis initiative, empowering sectors through human-AI collaboration. Our AI-powered solutions redefine content management, data analysis, trading strategies, market insights, and DeFi. Embrace efficiency, optimization, and innovation with CraftScript as we shape the future of technology together.",
  },
  '/use-cases': {
    title:
      'CraftScript | Exploring Use Cases in Web3, DeFi, Dex, and AI Projects',
    description:
      "Discover CraftScript's innovative projects in Web3, DeFi, Dex, and AI realms, including an end-to-end platform facilitating alternative asset investing, a decentralized insurance platform like BridgeMutual, and a DeFi platform enabling composable leverage and lending solutions. Explore the future of finance and technology with CraftScript.",
  },
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function buildLocalizedMetadata(
  pathname: string,
  locale: LocaleSlug = DEFAULT_LOCALE,
): Metadata {
  const routeMetadata = ROUTE_METADATA[pathname] ?? ROUTE_METADATA['/'];
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

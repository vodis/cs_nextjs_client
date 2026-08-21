import type { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES, withLocalePath } from '@src/i18n/locales';
import { absoluteUrl, LOCALIZED_ROUTE_PATHS } from '@src/i18n/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    LOCALIZED_ROUTE_PATHS.map((pathname) => ({
      url: absoluteUrl(withLocalePath(pathname, locale)),
      changeFrequency: 'weekly',
      priority: pathname === '/' ? 1 : 0.8,
    })),
  );
}

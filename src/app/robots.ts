import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@src/i18n/routes';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // TODO: Enable crawling before the production content release.
      disallow: '/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}

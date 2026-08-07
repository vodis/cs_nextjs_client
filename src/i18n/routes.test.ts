import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('route metadata utilities', () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const originalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.test';
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.test';
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    process.env.NEXT_PUBLIC_API_BASE_URL = originalApiBaseUrl;
    vi.restoreAllMocks();
  });

  it('uses translated metadata with canonical and alternate locale URLs', async () => {
    const fetchCalls: Array<{ url: string; init?: RequestInit }> = [];
    const fetchMock = vi.fn(
      async (url: Parameters<typeof fetch>[0], init?: RequestInit) => {
        fetchCalls.push({ url: String(url), init });

        return new Response(
          JSON.stringify({
            translations: {
              'Texts.metadata-about-title': 'Translated About Title',
              'Texts.metadata-about-description':
                'Translated about description.',
            },
          }),
        );
      },
    );

    vi.stubGlobal('fetch', fetchMock);

    const routes = await import('./routes');
    const metadata = await routes.buildLocalizedMetadata('/about', 'ua');

    expect(routes.absoluteUrl('/ua/about')).toBe(
      'https://example.test/ua/about',
    );
    expect(routes.LOCALIZED_ROUTE_PATHS).toEqual([
      '/',
      '/use-cases',
      '/ai',
      '/about',
    ]);
    expect(fetchCalls[0].url).toBe(
      'https://api.example.test/api/v1/translations/UA',
    );
    expect(fetchCalls[0].init?.next?.revalidate).toBe(3600);
    expect(metadata.title).toBe('Translated About Title');
    expect(metadata.description).toBe('Translated about description.');
    expect(metadata.alternates?.canonical).toBe(
      'https://example.test/ua/about',
    );
    expect(metadata.alternates?.languages?.en).toBe(
      'https://example.test/en/about',
    );
    expect(metadata.alternates?.languages?.uk).toBe(
      'https://example.test/ua/about',
    );
    expect(metadata.alternates?.languages?.pt).toBe(
      'https://example.test/pt/about',
    );
    expect(metadata.alternates?.languages?.['x-default']).toBe(
      'https://example.test/en/about',
    );
    expect(metadata.openGraph?.locale).toBe('uk');
    expect(metadata.openGraph?.url).toBe('https://example.test/ua/about');
  });
});

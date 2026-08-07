import assert from 'node:assert/strict';
import { test } from 'node:test';

test('route metadata utilities use translated metadata with canonical and alternate locale URLs', async () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://example.test';
  process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.test';

  const fetchCalls: Array<{ url: string; init?: RequestInit }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    fetchCalls.push({ url: String(url), init });

    return {
      ok: true,
      async json() {
        return {
          translations: {
            'Texts.metadata-about-title': 'Translated About Title',
            'Texts.metadata-about-description': 'Translated about description.',
          },
        };
      },
    } as Response;
  };

  try {
    const routes = await import('./routes');
    const metadata = await routes.buildLocalizedMetadata('/about', 'ua');

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
    assert.equal(
      fetchCalls[0].url,
      'https://api.example.test/api/v1/translations/UA',
    );
    assert.equal(fetchCalls[0].init?.next?.revalidate, 3600);
    assert.equal(metadata.title, 'Translated About Title');
    assert.equal(metadata.description, 'Translated about description.');
    assert.equal(
      metadata.alternates?.canonical,
      'https://example.test/ua/about',
    );
    assert.equal(
      metadata.alternates?.languages?.en,
      'https://example.test/en/about',
    );
    assert.equal(
      metadata.alternates?.languages?.uk,
      'https://example.test/ua/about',
    );
    assert.equal(
      metadata.alternates?.languages?.pt,
      'https://example.test/pt/about',
    );
    assert.equal(
      metadata.alternates?.languages?.['x-default'],
      'https://example.test/en/about',
    );
    assert.equal(metadata.openGraph?.locale, 'uk');
    assert.equal(metadata.openGraph?.url, 'https://example.test/ua/about');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

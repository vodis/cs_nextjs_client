import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('server i18n utilities', () => {
  const originalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.test';
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = originalApiBaseUrl;
    vi.restoreAllMocks();
  });

  it('builds a locale-specific Redux state from server translations', async () => {
    const fetchMock = vi.fn(
      async (url: Parameters<typeof fetch>[0], init?: RequestInit) => {
        expect(String(url)).toBe(
          'https://api.example.test/api/v1/translations/UA',
        );
        expect(init?.next?.revalidate).toBe(3600);

        return new Response(
          JSON.stringify({
            languages: {
              UA: {
                language: 'Ukrainian',
                title: 'UA',
              },
            },
            translations: {
              'Texts.content-about-paragraph-1': 'Translated paragraph',
            },
          }),
        );
      },
    );

    vi.stubGlobal('fetch', fetchMock);

    const { getServerI18nState } = await import('./server');
    const i18nState = await getServerI18nState('ua');

    expect(i18nState.activeLanguage).toBe('UA');
    expect(i18nState.languages.UA.language).toBe('Ukrainian');
    expect(i18nState.translations['Texts.content-about-paragraph-1']).toBe(
      'Translated paragraph',
    );
    expect(i18nState.translations['Texts.animate-label-home']).toBe(
      'Unlock your potential',
    );
  });
});

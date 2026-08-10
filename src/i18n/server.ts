import {
  defaultLanguages,
  defaultTranslations,
} from '@src/stores/reducers/i18n/default';
import type { II18nState } from '@src/stores/reducers/i18n/reducer';
import type { ILanguage, ITranslationItem } from '@src/types/entities/language';
import { localeToLanguage, type LocaleSlug } from '@src/i18n/locales';

export async function getServerI18nState(
  locale: LocaleSlug,
): Promise<II18nState> {
  const activeLanguage = localeToLanguage(locale);
  const language = await getServerLanguage(activeLanguage);

  return {
    activeLanguage,
    languages: language.languages ?? defaultLanguages,
    translations: {
      ...defaultTranslations,
      ...(language.translations ?? {}),
    },
  };
}

export async function getServerTranslations(
  locale: LocaleSlug,
): Promise<ITranslationItem> {
  const i18nState = await getServerI18nState(locale);

  return i18nState.translations;
}

async function getServerLanguage(activeLanguage: string): Promise<ILanguage> {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    return {
      languages: defaultLanguages,
      translations: defaultTranslations,
    };
  }

  try {
    const response = await fetch(
      new URL(
        `api/v1/translations/${activeLanguage}`,
        process.env.NEXT_PUBLIC_API_BASE_URL,
      ),
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      return {
        languages: defaultLanguages,
        translations: defaultTranslations,
      };
    }

    return response.json();
  } catch {
    return {
      languages: defaultLanguages,
      translations: defaultTranslations,
    };
  }
}

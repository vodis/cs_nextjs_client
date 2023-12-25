import { setLanguagesAndTranslations } from "@src/stores/reducers/i18n/reducer";
import { ILanguage } from "@src/types/entities/language";

export const updateLanguagesAndTranslations = (languagesAndTranslations: ILanguage) => (
    { type: setLanguagesAndTranslations.type, payload: languagesAndTranslations }
);

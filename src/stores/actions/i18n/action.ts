import { setLanguagesAndTranslations, setActiveLanguage } from "@src/stores/reducers/i18n/reducer";
import { ILanguage } from "@src/types/entities/language";

export const updateLanguagesAndTranslations = (languagesAndTranslations: ILanguage) => {
    return (
        {type: setLanguagesAndTranslations.type, payload: languagesAndTranslations}
    );
};

export const updateActiveLanguage = (activeLanguage: string) => {
    return (
        {type: setActiveLanguage.type, payload: activeLanguage}
    );
}

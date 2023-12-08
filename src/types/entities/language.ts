export interface ILanguageItem {
    [key: string]: {
        language: string;
        title: string;
    }
}

export interface ITranslationItem {
    [key: string]: string;
}

export interface ILanguage {
    languages: ILanguageItem;
    translations: ITranslationItem;
}

'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { QueryClient } from "@src/providers/providers";
import { ILanguage } from "@src/types/entities/language";
import { getLanguageKey } from "@src/api/language/useGetTranslationsAndLanguages";

const initialState = {
    translations: {},
    languages: {
        EN: 'English',
    },
    activeLanguage: Cookies.get('active-language') || 'EN',
};

export const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setI18N: (state) => {
            const translationsAndLanguages: ILanguage = QueryClient.getQueryData(getLanguageKey);
            state.languages = translationsAndLanguages?.languages || state.languages;
            state.translations = translationsAndLanguages?.translations || state.translations;
        },
    },
});

export const { setI18N } = i18nSlice.actions;
export default i18nSlice.reducer;

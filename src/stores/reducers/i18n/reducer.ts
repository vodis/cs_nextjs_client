'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ILanguage } from "@src/types/entities/language";
import { defaultTranslations } from "@src/stores/reducers/i18n/default";

interface II18nState extends ILanguage {
    activeLanguage: string;
}

const initialState: II18nState = {
    translations: defaultTranslations,
    languages: {
        EN: {
            language: 'English',
            title: 'EN',
        },
    },
    activeLanguage: Cookies.get('active-language') || 'EN',
};

export const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setLanguagesAndTranslations: (state, action: PayloadAction<ILanguage>) => {
            state.languages = action.payload.languages;
            state.translations = action.payload.translations;
        },
    },
});

export const { setLanguagesAndTranslations } = i18nSlice.actions;
export default i18nSlice.reducer;

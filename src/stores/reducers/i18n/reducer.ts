"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    translations: {},
    languages: {
        EN: 'English',
    }
};

export const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        updateI18N: (state, action) => {
            state.translations = action.translations;
            state.languages = action.languages;
        },
    },
});

export const { updateI18N } = i18nSlice.actions;
export default i18nSlice.reducer;

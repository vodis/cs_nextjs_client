'use client';

import React, {Suspense, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTranslationsAndLanguages } from "@src/api/language/useGetTranslationsAndLanguages";
import { updateLanguagesAndTranslations } from "@src/stores/actions/i18n/action";

const LanguageProvider = ({ children }: React.PropsWithChildren) => {
    const dispatch = useDispatch();
    const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);

    const { data: language, isFetched } = useGetTranslationsAndLanguages(activeLanguage);

    useEffect(() => {
        if (isFetched && !!language) {
            dispatch(updateLanguagesAndTranslations(language));
        }
    }, [dispatch, language, isFetched]);

    return (
        <Suspense fallback={<div>...</div>}>
            { children }
        </Suspense>
    );
};

export default LanguageProvider;

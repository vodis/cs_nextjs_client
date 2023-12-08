'use client';

import React, {Suspense, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTranslationsAndLanguages } from "@src/api/language/useGetTranslationsAndLanguages";
import { setI18N } from "@src/stores/reducers/i18n/reducer";

const LanguageProvider = ({ children }: React.PropsWithChildren) => {
    const dispatch = useDispatch();
    const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);

    const { data } = useGetTranslationsAndLanguages(activeLanguage);

    useEffect(() => {
        dispatch(setI18N());
    }, [data]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            { children }
        </Suspense>
    );
};

export default LanguageProvider;

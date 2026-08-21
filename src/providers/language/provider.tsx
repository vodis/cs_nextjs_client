'use client';

import React, { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { useSelector } from '@src/stores/hooks';
import { useGetTranslationsAndLanguages } from '@src/api/language/useGetTranslationsAndLanguages';
import {
  updateActiveLanguage,
  updateLanguagesAndTranslations,
} from '@src/stores/actions/i18n/action';
import { getLanguageFromPathname } from '@src/i18n/locales';

const LanguageProvider = ({ children }: React.PropsWithChildren) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);
  const routeLanguage = getLanguageFromPathname(pathname);

  const { data: language, isFetched } =
    useGetTranslationsAndLanguages(routeLanguage);

  useEffect(() => {
    if (activeLanguage !== routeLanguage) {
      dispatch(updateActiveLanguage(routeLanguage));
    }
  }, [activeLanguage, dispatch, routeLanguage]);

  useEffect(() => {
    if (isFetched && !!language) {
      dispatch(updateLanguagesAndTranslations(language));
    }
  }, [dispatch, language, isFetched]);

  return <Suspense fallback={<div>...</div>}>{children}</Suspense>;
};

export default LanguageProvider;

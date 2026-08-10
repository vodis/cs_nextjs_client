import React, { PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';

import { isLocaleSlug, SUPPORTED_LOCALES } from '@src/i18n/locales';
import { getServerI18nState } from '@src/i18n/server';
import Providers from '@src/providers/providers';

interface ILocaleLayoutProps extends PropsWithChildren {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

const LocaleLayout: React.FC<ILocaleLayoutProps> = async ({
  children,
  params,
}) => {
  if (!isLocaleSlug(params.locale)) {
    notFound();
  }

  const preloadedState = {
    i18n: await getServerI18nState(params.locale),
  };

  return <Providers preloadedState={preloadedState}>{children}</Providers>;
};

export default LocaleLayout;

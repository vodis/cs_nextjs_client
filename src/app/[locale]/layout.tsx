import React, { PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';

import { isLocaleSlug, SUPPORTED_LOCALES } from '@src/i18n/locales';

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

  return <>{children}</>;
};

export default LocaleLayout;

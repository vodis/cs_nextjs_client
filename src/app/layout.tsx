import React, { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import localFont from 'next/font/local';

import Providers from '@src/providers/providers';
import GoogleAnalytics from '@src/components/GoogleAnalytics';
import { Header } from '@src/components/Header';
import { Footer } from '@src/components/Footer';
import Menu from '@src/components/Menu';
import DynamicBg from '@src/components/DynamicBg';
import {
  DEFAULT_LOCALE,
  isLocaleSlug,
  LOCALE_HTML_LANG,
} from '@src/i18n/locales';
import { SITE_URL } from '@src/i18n/routes';

import 'react-toastify/dist/ReactToastify.min.css';
import '@vodis/cs-foundation/styles/tokens.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

const aeonikFono = localFont({
  variable: '--font-aeonik-fono',
  src: '../assets/fonts/AeonikFono/AeonikFono-Regular.ttf',
});

const kodeMono = localFont({
  variable: '--font-aeonik-fono',
  src: '../assets/fonts/KodeMono/KodeMono.ttf',
});

const neueHaasGrot = localFont({
  variable: '--font-neue-haas-grot',
  src: [
    {
      path: '../assets/fonts/NeueHaasGrotDisp/NeueHaasGrotDisp-45Light.otf',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../assets/fonts/NeueHaasGrotDisp/NeueHaasGrotDisp-55Roman.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NeueHaasGrotDisp/NeueHaasGrotDisp-75Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const localeHeader = headers().get('x-cs-locale') ?? DEFAULT_LOCALE;
  const locale = isLocaleSlug(localeHeader) ? localeHeader : DEFAULT_LOCALE;

  return (
    <html lang={LOCALE_HTML_LANG[locale]}>
      <body
        className={clsx(
          aeonikFono.variable,
          neueHaasGrot.variable,
          kodeMono.variable,
          'text-gray-100 leading-normal',
        )}
      >
        <GoogleAnalytics />
        <main className="h-full flex flex-1 flex-col bg-black">
          <Providers>
            <Header>
              <Menu />
            </Header>
            <DynamicBg />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;

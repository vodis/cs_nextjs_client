import { NextRequest, NextResponse } from 'next/server';

import {
  getLocaleFromPathname,
  getPreferredLocale,
  isLocaleSlug,
  localeToLanguage,
  withLocalePath,
} from './i18n/locales';

const PUBLIC_FILE = /\.(.*)$/;
const UNLOCALIZED_PATHS = new Set(['/health']);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkipLocaleMiddleware(pathname)) {
    return NextResponse.next();
  }

  const [, maybeLocale] = pathname.split('/');

  if (!isLocaleSlug(maybeLocale)) {
    const preferredLocale = getPreferredLocale(
      request.cookies.get('active-language')?.value,
    );
    const url = request.nextUrl.clone();
    url.pathname = withLocalePath(pathname, preferredLocale);

    const response = NextResponse.redirect(url, 308);
    response.cookies.set('active-language', localeToLanguage(preferredLocale), {
      path: '/',
    });

    return response;
  }

  const locale = getLocaleFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-cs-locale', locale);
  requestHeaders.set('x-cs-language', localeToLanguage(locale));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set('active-language', localeToLanguage(locale), {
    path: '/',
  });

  return response;
}

function shouldSkipLocaleMiddleware(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/images') ||
    UNLOCALIZED_PATHS.has(pathname) ||
    PUBLIC_FILE.test(pathname)
  );
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};

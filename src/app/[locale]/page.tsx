import type { Metadata } from 'next';

import HomeLayout from '@src/app/(home)/layout';
import HomePage from '@src/app/(home)/page';
import {
  DEFAULT_LOCALE,
  isLocaleSlug,
  type LocaleSlug,
} from '@src/i18n/locales';
import { buildLocalizedMetadata } from '@src/i18n/routes';

interface ILocalizedPageProps {
  params: {
    locale: LocaleSlug;
  };
}

export function generateMetadata({
  params,
}: ILocalizedPageProps): Promise<Metadata> {
  return buildLocalizedMetadata(
    '/',
    isLocaleSlug(params.locale) ? params.locale : DEFAULT_LOCALE,
  );
}

const LocalizedHomePage: React.FC = () => {
  return (
    <HomeLayout>
      <HomePage />
    </HomeLayout>
  );
};

export default LocalizedHomePage;

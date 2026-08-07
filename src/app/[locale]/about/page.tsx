import type { Metadata } from 'next';

import AboutLayout from '@src/app/about/layout';
import AboutPage from '@src/app/about/page';
import { isLocaleSlug, type LocaleSlug } from '@src/i18n/locales';
import { buildLocalizedMetadata } from '@src/i18n/routes';

interface ILocalizedPageProps {
  params: {
    locale: LocaleSlug;
  };
}

export function generateMetadata({ params }: ILocalizedPageProps): Metadata {
  return buildLocalizedMetadata(
    '/about',
    isLocaleSlug(params.locale) ? params.locale : 'en',
  );
}

const LocalizedAboutPage: React.FC = () => {
  return (
    <AboutLayout>
      <AboutPage />
    </AboutLayout>
  );
};

export default LocalizedAboutPage;

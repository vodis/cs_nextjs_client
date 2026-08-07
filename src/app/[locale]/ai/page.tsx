import type { Metadata } from 'next';

import AILayout from '@src/app/ai/layout';
import AIPage from '@src/app/ai/page';
import { isLocaleSlug, type LocaleSlug } from '@src/i18n/locales';
import { buildLocalizedMetadata } from '@src/i18n/routes';

interface ILocalizedPageProps {
  params: {
    locale: LocaleSlug;
  };
}

export function generateMetadata({ params }: ILocalizedPageProps): Metadata {
  return buildLocalizedMetadata(
    '/ai',
    isLocaleSlug(params.locale) ? params.locale : 'en',
  );
}

const LocalizedAIPage: React.FC = () => {
  return (
    <AILayout>
      <AIPage />
    </AILayout>
  );
};

export default LocalizedAIPage;

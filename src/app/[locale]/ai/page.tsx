import type { Metadata } from 'next';

import AILayout from '@src/app/ai/layout';
import AIPage from '@src/app/ai/page';
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
    '/ai',
    isLocaleSlug(params.locale) ? params.locale : DEFAULT_LOCALE,
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

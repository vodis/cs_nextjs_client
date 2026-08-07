import type { Metadata } from 'next';

import UseCasesLayout from '@src/app/use-cases/layout';
import UseCasesPage from '@src/app/use-cases/page';
import { isLocaleSlug, type LocaleSlug } from '@src/i18n/locales';
import { buildLocalizedMetadata } from '@src/i18n/routes';

interface ILocalizedPageProps {
  params: {
    locale: LocaleSlug;
  };
}

export function generateMetadata({ params }: ILocalizedPageProps): Metadata {
  return buildLocalizedMetadata(
    '/use-cases',
    isLocaleSlug(params.locale) ? params.locale : 'en',
  );
}

const LocalizedUseCasesPage: React.FC = () => {
  return (
    <UseCasesLayout>
      <UseCasesPage />
    </UseCasesLayout>
  );
};

export default LocalizedUseCasesPage;

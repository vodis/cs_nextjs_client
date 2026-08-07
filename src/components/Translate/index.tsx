'use client';

import React from 'react';

import { translate } from '@src/i18n/translate';
import { useSelector } from '@src/stores/hooks';

interface ITranslateProps {
  translationKey: string;
  fallback?: string;
}

const Translate: React.FC<ITranslateProps> = ({ translationKey, fallback }) => {
  const translations = useSelector(({ i18n }) => i18n.translations);

  return <>{translate(translations, translationKey, fallback)}</>;
};

export default Translate;

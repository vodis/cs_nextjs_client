'use client';

import React from 'react';
import { translate } from '@vodis/ui-kit/i18n/Translate';

import { useSelector } from '@src/stores/hooks';
import { IPanels } from '@src/components/Panels/types';
import Panels from '@src/components/Panels';

export const PanelWithTranslations: React.FC<IPanels> = (props: IPanels) => {
  const { text, ...rest } = props;
  const translations = useSelector(({ i18n }) => i18n.translations);

  return (
    <Panels text={translate(translations, text).toUpperCase()} {...rest} />
  );
};

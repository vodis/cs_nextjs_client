'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { useSelector } from '@src/stores/hooks';
import { updateActiveLanguage } from '@src/stores/actions/i18n/action';
import {
  languageToLocale,
  type LanguageCode,
  withLocalePath,
} from '@src/i18n/locales';

const Languages: React.FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState<null | string>(null);

  const handleClick = (language: LanguageCode) => {
    const locale = languageToLocale(language);

    setSelectedLanguage(language);
    dispatch(updateActiveLanguage(language));
    router.push(withLocalePath(pathname, locale));
  };

  useEffect(() => setSelectedLanguage(activeLanguage), [activeLanguage]);

  return (
    <div className="flex flex-col gap-2">
      <button
        className={clsx(
          'btn inline-flex',
          selectedLanguage === 'EN' && 'text-orange',
        )}
        onClick={() => handleClick('EN')}
        value="EN"
      >
        EN
      </button>
      <button
        className={clsx(
          'btn inline-flex',
          selectedLanguage === 'UA' && 'text-orange',
        )}
        onClick={() => handleClick('UA')}
        value="UA"
      >
        UA
      </button>
      <button
        className={clsx(
          'btn inline-flex',
          selectedLanguage === 'PT' && 'text-orange',
        )}
        onClick={() => handleClick('PT')}
        value="PT"
      >
        PT
      </button>
    </div>
  );
};

export default Languages;

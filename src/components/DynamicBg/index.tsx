'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { NAVIGATIONS } from '@src/constants/navigations';
import { stripLocaleFromPathname } from '@src/i18n/locales';

import styles from './dynamic-bg.module.scss';

const DynamicBg: React.FC = () => {
  const [bg, setBg] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    const unlocalizedPathname = stripLocaleFromPathname(pathname);
    const findUrlByIndex = NAVIGATIONS.findIndex(
      (link) => link.url === unlocalizedPathname,
    );
    setBg(NAVIGATIONS[findUrlByIndex]?.bg);
    return () => {};
  }, [pathname]);

  return (
    <div
      className={clsx(
        'fixed w-full h-full z-[1] bg-right-bottom bg-cover bg-left md:bg-center',
        `${styles['dynamic-bg']}`,
        bg && bg,
      )}
    ></div>
  );
};

export default DynamicBg;

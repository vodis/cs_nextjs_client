'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

import Translate from '@src/components/Translate';
import CloseBtn from '@src/components/CloseBtn';
import GetInTouchForm from '@src/components/MailBox/GetInTouchForm';

import styles from './mail-box.module.scss';

const MailBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const featureDisabled = false;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mail-box">
      <button
        onClick={handleOpen}
        disabled={featureDisabled}
        className="text-orange uppercase text-xs md:text-2xl disabled:text-gray-60"
      >
        <Translate translationKey="Texts.header-put-through" />
      </button>
      <div
        className={clsx(
          'fixed top-0 left-0 w-full md:w-4/6 lg:w-3/6 xl:w-2/6 h-full z-20 bg-gradient-to-r from-gray-30 to-white overflow-y-auto',
          `${styles['mail-box']}`,
          isOpen && `${styles['open']}`,
        )}
      >
        <div className="flex justify-center items-center h-full flex-col mx-10 md:mx-0 mt-20 mb-10 md:my-0">
          {isOpen && (
            <div className="fixed top-0 left-0 z-20 min-w-full grid grid-cols-4 md:grid-cols-7">
              <div className="flex items-center justify-center h-16 col-start-4 col-end-4 md:col-start-7 md:col-end-7">
                <CloseBtn onClose={handleOpen} className="w-8 md:w-10" />
              </div>
            </div>
          )}
          <GetInTouchForm />
        </div>
      </div>
    </div>
  );
};

export default MailBox;

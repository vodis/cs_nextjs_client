import React from 'react';

import Translate from '@src/components/Translate';

const ContentAbout = () => {
  return (
    <section className="flex flex-col gap-2 text-white px-6 mb-5">
      <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange">
        <Translate translationKey="Texts.content-about-title" />
      </h2>
      <p>
        <Translate translationKey="Texts.content-about-paragraph-1" />
      </p>
      <p>
        <Translate translationKey="Texts.content-about-paragraph-2" />
      </p>
      <p>
        <Translate translationKey="Texts.content-about-paragraph-3" />
      </p>
    </section>
  );
};

export default ContentAbout;

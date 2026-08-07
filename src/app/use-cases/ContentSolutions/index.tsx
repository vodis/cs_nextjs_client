import React from 'react';

import Translate from '@src/components/Translate';

const ContentSolutions = () => {
  return (
    <section className="flex flex-col gap-2 text-white px-6 mb-10">
      <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange">
        <Translate translationKey="Texts.content-solutions-title" />
      </h2>
      <p>
        <Translate translationKey="Texts.content-solutions-paragraph-1" />
      </p>
      <p>
        <Translate translationKey="Texts.content-solutions-paragraph-2" />
      </p>
      <p>
        <Translate translationKey="Texts.content-solutions-paragraph-3" />
      </p>
    </section>
  );
};

export default ContentSolutions;

'use client';

import React from 'react';

import { translate } from '@src/i18n/translate';
import { useSelector } from '@src/stores/hooks';
import ContentAbout from '@src/app/about/ContentAbout';
import AnimateTitle from '@src/components/AnimateTitle';
import LeaderCard from '@src/components/LeaderCard';

const AboutPage: React.FC = () => {
  const translations = useSelector(({ i18n }) => i18n.translations);

  const team = [
    {
      fullName: 'Dmytro Voitenko',
      position: ['Founder & Senior Full Stack Engineer'],
      in: 'https://www.linkedin.com/in/dmytro-voitenko-82871a145/',
      avatar: '/images/about/1c7cd944.jpg',
    },
    {
      fullName: 'Mariia Voitenko',
      position: ['Junior AI & Frontend Developer'],
      in: 'https://www.linkedin.com/in/mariia-voitenko-658bb3288',
      avatar: '/images/about/1c7cd888.jpg',
    },
  ];

  const aboutLabel = translate(translations, 'Texts.animate-label-about');

  return (
    <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
      <div className="flex items-start justify-center col-start-1 col-end-5 md:col-start-3 md:col-end-6">
        <div className="mt-10 md:mt-[25rem] w-full">
          <ContentAbout />
        </div>
      </div>
      <section className="flex items-start justify-center flex-col gap-10 col-start-2 col-end-5 md:col-start-3 md:col-end-6">
        <div className="lg:hidden w-full flex flex-col gap-10">
          {team.map((member) => (
            <div key={member.fullName} className="flex flex-col gap-10">
              <AnimateTitle title={aboutLabel} />
              <LeaderCard {...member} isMobile={true} />
            </div>
          ))}
        </div>
        <div className="hidden w-full lg:grid grid-cols-3 items-start">
          {team.map((member, index) => (
            <div
              key={member.fullName}
              className={`flex flex-col gap-10 ${
                index === 1 ? 'col-start-3 row-start-2' : ''
              }`}
            >
              <AnimateTitle title={aboutLabel} />
              <LeaderCard {...member} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

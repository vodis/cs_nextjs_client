'use client';

import React from "react";
import ContentAbout from "@src/app/about/ContentAbout";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import AnimateTitle from "@src/components/AnimateTitle";
import {useSelector} from "react-redux";
import LeaderCard from "@src/components/LeaderCard";

const AboutPage: React.FC = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);

    const team = [
        {
            fullName: 'Dmytro Voitenko',
            position: ['Founder', 'Senior Full Stack Developer'],
            in: 'https://www.linkedin.com/in/dima-voitenko-82871a145/',
            avatar: '/images/about/leader_1.png',
        },
    ];

    return (
        <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
            <div className="flex items-start justify-center col-start-1 col-end-5 md:col-start-3 md:col-end-6">
                <div className="mt-10 md:mt-[25rem] w-full">
                    <ContentAbout />
                </div>
            </div>
            <section className="flex items-start justify-center flex-col gap-10 col-start-2 col-end-5 md:col-start-3 md:col-end-6">
                <AnimateTitle title={translate(translations, 'Texts.animate-label-about')} />
                <div className="lg:hidden w-full">
                    <LeaderCard {...team[0]} isMobile={true} />
                </div>
                <div className="hidden w-full lg:grid grid-cols-2 md:grid-cols-3 grid-flow-col">
                    <LeaderCard {...team[0]} />
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

'use client';

import React from "react";
import { useSelector } from 'react-redux';
import AnimateTitle from "@src/components/AnimateTitle";
import AnimateText from "@src/components/AnimateText";
import { translate } from "@vodis/ui-kit/i18n/Translate";
import ContentContainer from "@src/app/(home)/ContentContainer";

const SourcePage: React.FC = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);

    return (
        <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
            <section className="flex items-start justify-center ml-16 md:ml-0 col-start-1 col-end-5 md:col-start-3 md:col-end-6">
                <div className="mt-10 md:mt-[25rem] mb-10 w-full">
                    <AnimateTitle title={translate(translations, 'Texts.animate-label-home')} />
                    <div className="mt-4">
                        <AnimateText text={translate(translations, 'Texts.animate-text-home-part-1')} dedicatedWordIndexes={[0]} transitionDelay="2.5s" />
                        <AnimateText text={translate(translations, 'Texts.animate-text-home-part-2')} dedicatedWordIndexes={[1]} transitionDelay="4s" />
                        <AnimateText text={translate(translations, 'Texts.animate-text-home-part-3')} dedicatedWordIndexes={[3]} transitionDelay="5.5s" />
                    </div>
                </div>
            </section>
            <ContentContainer />
        </div>
    );
};

export default SourcePage;

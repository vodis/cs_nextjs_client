'use client';

import React, {useState, lazy} from "react";
import { useSelector } from 'react-redux';
import AnimateTitle from "@src/components/AnimateTitle";
import { translate } from "@vodis/ui-kit/i18n/Translate";
import ContentAI from "@src/app/ai/ContentAI";

const AIPage: React.FC = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);

    return (
        <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
            <section className="flex items-start justify-center ml-16 md:ml-0 col-start-1 col-end-5 md:col-start-3 md:col-end-6">
                <div className="mt-10 md:mt-[25rem] mb-10 w-full">
                    <AnimateTitle title={translate(translations, 'Texts.animate-label-ai')} />
                </div>
            </section>
            <div className="mt-5 mb-3 flex flex-col items-start justify-center col-start-1 col-end-5 md:col-start-2 md:col-end-7">
                <ContentAI />
            </div>
        </div>
    );
};

export default AIPage;

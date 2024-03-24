'use client';

import React, {useState, lazy} from "react";
import { useSelector } from 'react-redux';
import AnimateTitle from "@src/components/AnimateTitle";
import { translate } from "@vodis/ui-kit/i18n/Translate";
import Carousel from "@src/components/Carousel";
import Product0 from "@src/app/use-cases/ProductFlyDescription/0";
import Product1 from "@src/app/use-cases/ProductFlyDescription/1";
import Product2 from "@src/app/use-cases/ProductFlyDescription/2";
import ContentSolutions from "@src/app/use-cases/ContentSolutions";

const UseCasesPage: React.FC = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = [
        {
            img: '/images/use-cases/use_cases_securitize.png',
            title: 'Investing and Trading of Alternative Assets',
            flyComponent: <Product0 />,
        },
        {
            img: '/images/use-cases/use_cases_rodeofinance.png',
            title: 'DeFi Platform for Composable Leverage and Lending',
            flyComponent: <Product1 />,
        },
        {
            img: '/images/use-cases/use_cases_bridge_mutual.png',
            title: 'Decentralized Insurance Platform For BridgeMutual',
            flyComponent: <Product2 />,
        },
    ];

    return (
        <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
            <section className="flex items-start justify-center ml-16 md:ml-0 col-start-1 col-end-5 md:col-start-3 md:col-end-6">
                <div className="mt-10 md:mt-[25rem] mb-10 w-full">
                    <AnimateTitle title={translate(translations, 'Texts.animate-label-use-cases')} />
                    <div className="mt-4 h-[9rem]">
                        {products[currentSlide].flyComponent}
                    </div>
                </div>
            </section>
            <div className="mt-5 mb-3 flex flex-col items-start justify-center col-start-1 col-end-5 md:col-start-2 md:col-end-5">
                <div className="lg:hidden"><Carousel srcs={products} isMobile={true} onSlideChange={(swipe) => setCurrentSlide(swipe.activeIndex)} /></div>
                <div className="hidden lg:flex"><Carousel srcs={products} onSlideChange={(swipe) => setCurrentSlide(swipe.activeIndex)} /></div>
            </div>
            <div className="mt-5 mb-3 flex flex-col items-start justify-center col-start-1 col-end-5 md:col-start-5 md:col-end-7">
                <ContentSolutions />
            </div>
        </div>
    );
};

export default UseCasesPage;

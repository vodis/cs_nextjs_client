import React from "react";
import AnimateText from "@src/components/AnimateText";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import {useSelector} from "react-redux";

const Product0 = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    return (
        <>
            <AnimateText text={translate(translations, 'End-to-End Platform to')} dedicatedWordIndexes={[]} />
            <AnimateText text={translate(translations, 'Ease the Investing and Trading')} dedicatedWordIndexes={[2, 4]} transitionDelay="2.5s" />
            <AnimateText text={translate(translations, 'of Alternative Assets, with')} dedicatedWordIndexes={[2]} transitionDelay="4s" />
            <AnimateText text={translate(translations, 'a Goal to Increase Overall Liquidity')} dedicatedWordIndexes={[5]} transitionDelay="5.5s" />
        </>
    );
}

export default Product0;

import React from "react";
import AnimateText from "@src/components/AnimateText";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import {useSelector} from "react-redux";

const Product2 = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    return (
        <>
            <AnimateText text={translate(translations, 'Bridge Mutual’s Reinsurance Pool')} dedicatedWordIndexes={[3]} />
            <AnimateText text={translate(translations, 'incorporates protocol-owned funds')} dedicatedWordIndexes={[]} transitionDelay="2.5s" />
            <AnimateText text={translate(translations, 'with interest is earned from 3 factors:')} dedicatedWordIndexes={[]} transitionDelay="4s" />
            <AnimateText text={translate(translations, 'DeFi Yield Generator, Protocol Fee')} dedicatedWordIndexes={[1, 4]} transitionDelay="5.5s" />
            <AnimateText text={translate(translations, 'and Reward Pool')} dedicatedWordIndexes={[1]} transitionDelay="7s" />
        </>
    );
}

export default Product2;

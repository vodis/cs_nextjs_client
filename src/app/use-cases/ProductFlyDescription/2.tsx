import React from "react";
import AnimateText from "@src/components/AnimateText";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import {useSelector} from "react-redux";
import {useDedicatedWordIndexes} from "@src/hooks";

const Product2 = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);
    const dedicatedIndexesPart1 = useDedicatedWordIndexes([[2], [3], [0]]);
    const dedicatedIndexesPart2 = useDedicatedWordIndexes([[], [], [1]]);
    const dedicatedIndexesPart3 = useDedicatedWordIndexes([[], [3], []]);
    const dedicatedIndexesPart4 = useDedicatedWordIndexes([[0, 1, 4], [1], [1, 2]]);
    const dedicatedIndexesPart5 = useDedicatedWordIndexes([[1], [1, 2], [4]]);
    return (
        <>
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-2-part-1')} dedicatedWordIndexes={dedicatedIndexesPart1(activeLanguage)} />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-2-part-2')} dedicatedWordIndexes={dedicatedIndexesPart2(activeLanguage)} transitionDelay="2.5s" />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-2-part-3')} dedicatedWordIndexes={dedicatedIndexesPart3(activeLanguage)} transitionDelay="4s" />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-2-part-4')} dedicatedWordIndexes={dedicatedIndexesPart4(activeLanguage)} transitionDelay="5.5s" />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-2-part-5')} dedicatedWordIndexes={dedicatedIndexesPart5(activeLanguage)} transitionDelay="7s" />
        </>
    );
}

export default Product2;

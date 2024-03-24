import React from "react";
import AnimateText from "@src/components/AnimateText";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import {useSelector} from "react-redux";
import {useDedicatedWordIndexes} from "@src/hooks";

const Product1 = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);
    const dedicatedIndexesPart2 = useDedicatedWordIndexes([[0], [1], [1]]);
    const dedicatedIndexesPart3 = useDedicatedWordIndexes([[1], [1, 2], [1]]);
    const dedicatedIndexesPart4 = useDedicatedWordIndexes([[0], [1], [1]]);
    return (
        <>
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-1-part-1')} dedicatedWordIndexes={dedicatedIndexesPart2(activeLanguage)} />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-1-part-2')} dedicatedWordIndexes={dedicatedIndexesPart3(activeLanguage)} transitionDelay="2.5s" />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-1-part-3')} dedicatedWordIndexes={dedicatedIndexesPart4(activeLanguage)} transitionDelay="4s" />
        </>
    );
}

export default Product1;

import React, {useCallback} from "react";
import AnimateText from "@src/components/AnimateText";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import {useSelector} from "react-redux";
import {useDedicatedWordIndexes} from "@src/hooks";

const Product0 = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);
    const dedicatedIndexesPart2 = useDedicatedWordIndexes([[2, 4], [1, 3], [0, 2]]);
    const dedicatedIndexesPart3 = useDedicatedWordIndexes([[2], [], [0]]);
    const dedicatedIndexesPart4 = useDedicatedWordIndexes([[5], [2], [4]]);
    return (
        <>
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-0-part-1')} dedicatedWordIndexes={[]} />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-0-part-2')} dedicatedWordIndexes={dedicatedIndexesPart2(activeLanguage)} transitionDelay="2.5s" />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-0-part-3')} dedicatedWordIndexes={dedicatedIndexesPart3(activeLanguage)} transitionDelay="4s" />
            <AnimateText text={translate(translations, 'Texts.animate-text-use-cases-product-0-part-4')} dedicatedWordIndexes={dedicatedIndexesPart4(activeLanguage)} transitionDelay="5.5s" />
        </>
    );
}

export default Product0;

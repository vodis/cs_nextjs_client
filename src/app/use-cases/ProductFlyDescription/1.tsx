import React from "react";
import AnimateText from "@src/components/AnimateText";
import {translate} from "@vodis/ui-kit/i18n/Translate";
import {useSelector} from "react-redux";

const Product1 = () => {
    const translations = useSelector(({ i18n }) => i18n.translations);
    return (
        <>
            <AnimateText text={translate(translations, 'DeFi Platform for Composable')} dedicatedWordIndexes={[0]} />
            <AnimateText text={translate(translations, 'Leverage and Lending')} dedicatedWordIndexes={[0, 2]} transitionDelay="2.5s" />
        </>
    );
}

export default Product1;

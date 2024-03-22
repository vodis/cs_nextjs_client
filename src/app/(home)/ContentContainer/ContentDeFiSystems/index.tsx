import {InfoBox} from "@src/components/InfoBox";
import Translate from "@vodis/ui-kit/i18n/Translate";
import React from "react";

const ContentDeFiSystems = () => {
    return (
        <InfoBox img="/images/home/home_defi_systems_card.png" title="DeFi Systems" imgPosition="right">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange"><Translate translationKey="Texts.content-content-defi-systems-title" /></h2>
                <p><Translate translationKey="Texts.content-content-defi-systems-paragraph-1" /></p>
                <p><Translate translationKey="Texts.content-content-defi-systems-paragraph-2" /></p>
                <p><Translate translationKey="Texts.content-content-defi-systems-paragraph-3" /></p>
            </section>
        </InfoBox>
    );
}

export default ContentDeFiSystems;

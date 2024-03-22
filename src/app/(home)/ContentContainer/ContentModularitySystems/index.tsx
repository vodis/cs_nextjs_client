import {InfoBox} from "@src/components/InfoBox";
import Translate from "@vodis/ui-kit/i18n/Translate";
import React from "react";

const ContentModularitySystems = () => {
    return (
        <InfoBox img="/images/home/home_modularity_systems_card.png" title="Modularity Systems" imgPosition="right">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange"><Translate translationKey="Texts.content-content-modularity-systems-title" /></h2>
                <p><Translate translationKey="Texts.content-content-modularity-systems-paragraph-1" /></p>
                <p><Translate translationKey="Texts.content-content-modularity-systems-paragraph-2" /></p>
                <p><Translate translationKey="Texts.content-content-modularity-systems-paragraph-3" /></p>
            </section>
        </InfoBox>
    );
}

export default ContentModularitySystems;

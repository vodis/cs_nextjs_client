import {InfoBox} from "@src/components/InfoBox";
import Translate from "@vodis/ui-kit/i18n/Translate";
import React from "react";

const ContentCMSSystems = () => {
    return (
        <InfoBox img="/images/home/home_cms_systems_card.jpg" title="CMS Systems">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange"><Translate translationKey="Texts.content-content-cms-systems-title" /></h2>
                <p><Translate translationKey="Texts.content-content-cms-systems-paragraph-1" /></p>
                <p><Translate translationKey="Texts.content-content-cms-systems-paragraph-2" /></p>
                <p><Translate translationKey="Texts.content-content-cms-systems-paragraph-3" /></p>
            </section>
        </InfoBox>
    );
}

export default ContentCMSSystems;

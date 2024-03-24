import {InfoBox} from "@src/components/InfoBox";
import homeAiIntegrationCard from "@public/images/home/home_ai_integration_card.png";
import Translate from "@vodis/ui-kit/i18n/Translate";
import React from "react";

const ContentAIIntegration = () => {
    return (
        <InfoBox img={homeAiIntegrationCard} title="Content AI">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange"><Translate translationKey="Texts.content-ai-integration-title" /></h2>
                <p><Translate translationKey="Texts.content-ai-integration-paragraph-1" /></p>
                <p><Translate translationKey="Texts.content-ai-integration-paragraph-2" /></p>
                <p><Translate translationKey="Texts.content-ai-integration-paragraph-3" /></p>
            </section>
        </InfoBox>
    );
}

export default ContentAIIntegration;

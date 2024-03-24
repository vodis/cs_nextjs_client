import Translate from "@vodis/ui-kit/i18n/Translate";
import React from "react";

const ContentAI = () => {
    return (
        <section className="flex flex-col gap-2 text-white px-6 mb-10">
            <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange"><Translate translationKey="Texts.content-ai-title" /></h2>
            <p><Translate translationKey="Texts.content-ai-paragraph-1" /></p>
            <p><Translate translationKey="Texts.content-ai-paragraph-2" /></p>
            <p><Translate translationKey="Texts.content-ai-paragraph-3" /></p>
        </section>
    );
}

export default ContentAI;

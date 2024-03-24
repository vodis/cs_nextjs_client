import {InfoBox} from "@src/components/InfoBox";
import Translate from "@vodis/ui-kit/i18n/Translate";
import React from "react";

const ContentSoftwareProcesses = () => {
    return (
        <InfoBox img="/images/home/home_software_processes_card.png" title="Software Development Processes">
            <section className="flex flex-col gap-2">
                <h2 className="mt-10 mb-5 text-xl tracking-wide uppercase text-orange"><Translate translationKey="Texts.content-content-software-processes-title" /></h2>
                <p><Translate translationKey="Texts.content-content-software-processes-paragraph-1" /></p>
                <p><Translate translationKey="Texts.content-content-software-processes-paragraph-2" /></p>
                <p><Translate translationKey="Texts.content-content-software-processes-paragraph-3" /></p>
            </section>
        </InfoBox>
    );
}

export default ContentSoftwareProcesses;

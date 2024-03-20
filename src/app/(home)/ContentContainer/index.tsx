import React from "react";
import ContentAIIntegration from "@src/app/(home)/ContentContainer/ContentAIIntegration";
import ContentDeFiSystems from "@src/app/(home)/ContentContainer/ContentDeFiSystems";
import ContentCMSSystems from "@src/app/(home)/ContentContainer/ContentCMSSystems";
import ContentModularitySystems from "@src/app/(home)/ContentContainer/ContentModularitySystems";
import ContentSoftwareProcesses from "@src/app/(home)/ContentContainer/ContentSoftwareProcesses";

const ContentContainer: React.FC = () => {
    return (
        <>
            <ContentAIIntegration />
            <ContentDeFiSystems />
            <ContentCMSSystems />
            <ContentModularitySystems />
            <ContentSoftwareProcesses />
        </>
    );
}

export default ContentContainer;

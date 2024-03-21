import React, { PropsWithChildren } from "react";
import type { Metadata } from 'next';

import { PanelWithTranslations } from "@src/components/Panels/PanelsWithTranslations";

export const metadata: Metadata = {
    title: 'CraftScript | Exploring Use Cases in Web3, DeFi, Dex, and AI Projects',
    description: 'Discover CraftScript\'s innovative projects in Web3, DeFi, Dex, and AI realms, including an end-to-end platform facilitating alternative asset investing, a decentralized insurance platform like BridgeMutual, and a DeFi platform enabling composable leverage and lending solutions. Explore the future of finance and technology with CraftScript.',
};

const UseCasesLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className="hidden lg:block">
                <PanelWithTranslations text={"Product".toUpperCase()} />
            </div>
            <div className="z-10 w-full max-h-[calc(100vh-8rem)] flex-grow max-auto overflow-auto">
               {children}
            </div>
        </>
    );
}

export default UseCasesLayout;

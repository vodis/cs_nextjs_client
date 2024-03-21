import React, { PropsWithChildren } from "react";
import type { Metadata } from 'next';

import { PanelWithTranslations } from "@src/components/Panels/PanelsWithTranslations";

export const metadata: Metadata = {
    title: 'CraftScript | Revolutionizing Industries Through Human-AI Collaboration | AI Symbiosis',
    description: 'Explore CraftScript\'s AI Symbiosis initiative, empowering sectors through human-AI collaboration. Our AI-powered solutions redefine content management, data analysis, trading strategies, market insights, and DeFi. Embrace efficiency, optimization, and innovation with CraftScript as we shape the future of technology together.',
};

const AILayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className="hidden lg:block">
                <PanelWithTranslations text={"AI".toUpperCase()} />
            </div>
            <div className="z-10 w-full max-h-[calc(100vh-8rem)] flex-grow max-auto overflow-auto">
               {children}
            </div>
        </>
    );
}

export default AILayout;

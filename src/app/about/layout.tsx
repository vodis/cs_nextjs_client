import React, {PropsWithChildren} from "react";
import Panels from "@src/components/Panels";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'About CraftScript | Pioneering Web3 Adoption and AI Innovation',
    description: 'Learn about CraftScript\'s mission to drive widespread adoption of Web3 technologies across sectors. We seamlessly integrate Web3 innovations into business models, empowering clients to pioneer innovation and uphold digital privacy standards. As a digital engineering company, we craft cutting-edge solutions in symbiotic Web3 and AI ecosystems.',
};

const AboutLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className="hidden lg:block">
                <Panels text={"craft".toUpperCase()} />
            </div>
            <div className="z-10 w-full max-h-[calc(100vh-8rem)] flex-grow max-auto overflow-auto">
               {children}
            </div>
        </>
    );
}

export default AboutLayout;

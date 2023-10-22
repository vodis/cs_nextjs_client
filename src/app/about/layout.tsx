import React, {PropsWithChildren, useState} from "react";
import Panels from "@src/components/Panels";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'CraftScript | About us',
    description: '',
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

import React, {PropsWithChildren, useState} from "react";
import Panels from "@src/components/Panels";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Craft Script | Easy discovering of Web3 world together | DEX in your hands',
    description: 'Our aim is creating smart scripts in any smart contract programming languages and reach to the best market results in a world. Join to Craft Script team and participate in development at open source solutions.',
};

const HomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <div className="hidden lg:block">
                <Panels text={"future".toUpperCase()} />
            </div>
            <div className="z-10 w-full max-h-[calc(100vh-8rem)] flex-grow max-auto overflow-auto">
               {children}
            </div>
        </>
    );
}

export default HomeLayout;

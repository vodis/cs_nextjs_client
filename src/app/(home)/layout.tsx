'use client';

import React, {PropsWithChildren, useState} from "react";
import Panels from "@src/components/Panels";

const HomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const [play, setPlay] = useState(true);
    return (
        <div className="w-full min-h-[calc(100dvh-8rem)] max-auto">
            <div className="hidden lg:block">
                <Panels play={play} text={"future".toUpperCase()} />
            </div>
            {children}
        </div>
    );
}

export default HomeLayout;

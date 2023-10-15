'use client';

import React, {useState} from "react";
import Panels from "@src/components/Panels";

const SourcePage: React.FC = () => {
    const [play, setPlay] = useState(true)
    return (
        <>
            <div className="hidden lg:block">
                <Panels play={play} text={"future".toUpperCase()} />
            </div>
        </>
    );
};

export default SourcePage;

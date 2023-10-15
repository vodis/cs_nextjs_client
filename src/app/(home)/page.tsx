'use client';

import React, {useState} from "react";
import Panels from "@src/components/Panels";

const SourcePage: React.FC = () => {
    const [play, setPlay] = useState(true)
    return (
        <>
            <Panels play={play} text={"future".toUpperCase()} />
            <button
                className={`btn btn-filled`}
                onClick={() => setPlay(false)}
            >
                Click
            </button>
        </>
    );
};

export default SourcePage;

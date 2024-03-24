import {useCallback} from "react";

const useDedicatedWordIndexes = (constantRegister: number[][]) => {
    return useCallback((languages: string): number[] => {
        if (languages === "EN") return constantRegister[0];
        if (languages === "UA") return constantRegister[1];
        if (languages === "PT") return constantRegister[2];
        return [];
    }, [constantRegister]);
}

export default useDedicatedWordIndexes;

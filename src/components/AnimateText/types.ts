import { CSSProperties } from "react";

export interface IAnimateText {
    text: string;
    dedicatedWordIndexes?: number[];
    transitionDelay?: CSSProperties['animationDuration'];
}

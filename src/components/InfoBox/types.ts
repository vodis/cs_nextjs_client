import {ReactNode} from "react";

export interface IInfoBox {
    children: ReactNode | undefined;
    title: string;
    img?: string;
    imgPosition?: 'left' | 'right';
}

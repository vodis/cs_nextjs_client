import {ReactNode} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface IInfoBox {
    children: ReactNode | undefined;
    title: string;
    img?: string | StaticImport;
    imgPosition?: 'left' | 'right';
}

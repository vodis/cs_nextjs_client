import {ReactNode} from "react";

export interface IMenu {
  open: boolean;
  children?: ReactNode | undefined;
}

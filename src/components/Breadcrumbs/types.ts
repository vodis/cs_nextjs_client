import { INavigations } from "@src/constants/navigations";

export interface IBreadcrumbs {
    navigations: INavigations[];
    onNavigate?: () => void;
}

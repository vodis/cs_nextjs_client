export interface IBreadcrumbs {
    navigations: INavigations[];
    onNavigate?: () => void;
}

export interface INavigations {
    name: string;
    url: string;
}

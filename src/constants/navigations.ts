export interface INavigations {
    name: string;
    url: string;
    bg?: string;
}

export const NAVIGATIONS: INavigations[] = [
    {
        name: "Texts.bread-crumbs-label-home",
        url: "/",
        bg: "bg-main-page",
    },
    {
        name: "Texts.bread-crumbs-label-about",
        url: "/about",
        bg: "bg-about-page",
    },
    {
        name: "Texts.bread-crumbs-label-cases",
        url: "/use-cases",
        bg: "bg-cases-page",
    },
    {
        name: "Texts.bread-crumbs-label-developers",
        url: "/developers",
    },
    {
        name: "Texts.bread-crumbs-label-community",
        url: "/community",
    }
];

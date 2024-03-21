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
        name: "Texts.bread-crumbs-label-cases",
        url: "/use-cases",
        bg: "bg-cases-page",
    },
    {
        name: "Texts.bread-crumbs-label-ai",
        url: "/ai",
        bg: "bg-ai-page",
    },
    {
        name: "Texts.bread-crumbs-label-about",
        url: "/about",
        bg: "bg-about-page",
    },
];

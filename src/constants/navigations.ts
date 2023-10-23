export interface INavigations {
    name: string;
    url: string;
    bg?: string;
}

export const NAVIGATIONS: INavigations[] = [
    {
        name: "Home",
        url: "/",
        bg: "bg-main-page",
    },
    {
        name: "About CraftScript",
        url: "/about",
        bg: "bg-about-page",
    },
    {
        name: "Real use cases",
        url: "/use-cases",
        bg: "bg-cases-page",
    },
    {
        name: "Developers",
        url: "/developers",
    },
    {
        name: "Community",
        url: "/community",
    }
];

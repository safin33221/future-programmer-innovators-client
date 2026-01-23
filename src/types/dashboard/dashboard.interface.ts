


export interface INavItems {
    title: string,
    href: string;
    icon: string;
    badge?: string | number
    description?: string;
    role: string[]
}

export interface INavSection {
    title: string;
    items: INavItems[]
}
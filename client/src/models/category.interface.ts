export interface iMainCategory {
    id: number;
    name: string;
    show: boolean;
    subCategories: iSubCategory[];
}

export interface iSubCategory {
    id: number;
    name: string;
}

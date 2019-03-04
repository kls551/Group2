export interface iMainCategory {
    id: number;
    name: string;
    show: boolean;
    subcategories: iSubCategory[];
}

export interface iSubCategory {
    id: number;
    name: string;
    maincategory: iMainCategory;
}

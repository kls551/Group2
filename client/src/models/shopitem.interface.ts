import { iMainCategory, iSubCategory } from "./category.interface";
import { iBrand } from "./brand.interface";

export interface iShopItem
{
  id: number;
  name: string;
  details: string;
  price: number;
  quantity: number;
  category: iMainCategory;
  subcategories: iSubCategory[];
  brand: iBrand;
  inStorePickup: boolean;
  postedDate: Date;
  images: iImg[];
  quant: number;
}

export interface iImg {
  id: number;
  img: string;
}

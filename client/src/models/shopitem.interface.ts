import { iMainCategory, iSubCategory } from "./category.interface";
import { iBrand } from "./brand.interface";

export interface iShopItem {
  id: number;
  name: string;
  details: string;
  price: number;
  quantity: number;
  category: string ;
  inStorePickup: boolean;
  brand: iBrand;
  postedDate: Date;
  images: iImg[];
  quant: number;
}

export interface iBrand {
  id: number;
  name: string;
}

export interface iImg {
  id: number;
  img: string;
}

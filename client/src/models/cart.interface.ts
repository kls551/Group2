import  { ShopItem } from "../../../api/entity";

export interface iCart {
    id: number;
    userId: number;
    items: ShopItem[];
  }

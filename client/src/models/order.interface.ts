import  { ShopItem } from "../../../api/entity";
export interface iOrder {
  id: number;
  userId: number;
  status: number;
  shipped: Date;
  orderedDate: Date;
  address: string;
  city: string;
  pickup: number;
  items: ShopItem[];
}
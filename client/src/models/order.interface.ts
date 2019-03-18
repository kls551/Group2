import  { ShopItem } from "../../../api/entity";
export interface iOrder {
  id: number;
  userId: number;
  complete: boolean;
  processing: boolean;
  status: number;
  shipped: Date;
  orderedDate: Date;
  address: string;
  city: string;
  pickup: number;
  trackingNum: string;
  items: ShopItem[];
}
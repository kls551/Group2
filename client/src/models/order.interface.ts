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
  pickup: boolean;
  trackingNum: string;
}
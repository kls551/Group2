export interface iOrder {
  id: number;
  userId: number;
  processing: boolean;
  shipped: boolean;
  orderedDate: Date;
  Address: string;
  cnum: string;
  fn: string;
  ln: string;
  City: string;
  pickup: boolean;
}
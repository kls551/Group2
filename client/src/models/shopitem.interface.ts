

export interface iShopItem {
  id: number;
  name: string;
  details: string;
  price: number;
  quantity: number;
  category: string ;
  inStorePickup: boolean;
  brand: string;
  postedDate: Date;
  images: iImg[];
}

export interface iBrand {
  id: number;
  name: string;
}

export interface iImg {
  id: number;
  img: string;
}

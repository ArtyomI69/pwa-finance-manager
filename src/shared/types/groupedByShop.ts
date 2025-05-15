interface GroupedItem {
  name: string;
  quantity: number;
  sum: number;
}

export interface GroupedByShop {
  shopName: string;
  totalSum: number;
  address: string;
  coordinates: string;
  items: GroupedItem[];
}

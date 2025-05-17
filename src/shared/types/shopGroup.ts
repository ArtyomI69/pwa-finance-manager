import { Category } from './category';
import { Profile } from './profile';
import { Shop } from './shop';

export interface PurchaseItem {
  id: number;
  category_id: number;
  shop_id: number;
  profile_id: string;
  name: string;
  sum: number;
  quantity: number;
  created_at: string;
  categories: Category;
  shops: Shop;
  profile: Profile;
}

export interface GroupedShop {
  shop: Shop;
  items: PurchaseItem[];
  totalSum: number;
}

export interface GroupedProfile {
  profile: Profile;
  shops: GroupedShop[];
  totalSum: number;
}

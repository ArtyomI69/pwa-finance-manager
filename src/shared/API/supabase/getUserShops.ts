import { GroupedByShop } from '@/shared/types/groupedByShop';
import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';
import { Category } from '@/shared/types/category';
import { Shop } from '@/shared/types/shop';
import { getShopRealName } from './getShopRealName';

interface PurchaseItem {
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
}

function groupByShop(data: PurchaseItem[]): GroupedByShop[] {
  const shopsMap = new Map<number, GroupedByShop>();

  data.forEach((item) => {
    const shopId = item.shop_id;

    if (!shopsMap.has(shopId)) {
      shopsMap.set(shopId, {
        shopName: getShopRealName(item.shops.name),
        totalSum: 0,
        address: item.shops.address,
        coordinates: item.shops.coordinates,
        items: [],
      });
    }

    const shopData = shopsMap.get(shopId)!;
    shopData.items.push({
      name: item.name,
      quantity: item.quantity,
      sum: item.sum,
    });
    shopData.totalSum += item.sum;
  });

  return Array.from(shopsMap.values());
}

export const getUserShops = async (profile_id?: string) => {
  if (!profile_id) profile_id = await getCurentUserId();

  const { data } = await createClient()
    .from('items')
    .select(
      `
      *,
      categories (*),
      shops (*)
    `
    )
    .eq('profile_id', profile_id);

  // @ts-ignore
  return groupByShop(data);
};

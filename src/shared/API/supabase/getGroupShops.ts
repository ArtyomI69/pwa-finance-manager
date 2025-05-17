import { createClient } from './client';
import { getCurrentUserGroupId } from './getCurrentUserGroupId';
import { getCurentUserId } from './getCurentUserId';
import { GroupedProfile, PurchaseItem } from '@/shared/types/shopGroup';
import { getShopRealName } from '@/shared/utils/getShopRealName';
import { DateRange } from 'react-day-picker';

function groupPurchasesByProfile(
  purchases: PurchaseItem[],
  currentProfileId?: string
): GroupedProfile[] {
  const profileMap = new Map<string, GroupedProfile>();

  purchases.forEach((item) => {
    if (!profileMap.has(item.profile_id)) {
      profileMap.set(item.profile_id, {
        profile: {
          ...item.profile,
          isCurrentUser: item.profile_id === currentProfileId,
        },
        shops: [],
        totalSum: 0,
      });
    }

    const profileGroup = profileMap.get(item.profile_id)!;

    let shopGroup = profileGroup.shops.find((s) => s.shop.id === item.shop_id);

    if (!shopGroup) {
      shopGroup = {
        shop: { ...item.shops, name: getShopRealName(item.shops.name) },
        items: [],
        totalSum: 0,
      };
      profileGroup.shops.push(shopGroup);
    }

    shopGroup.items.push(item);
    shopGroup.totalSum += item.sum / 100;
    profileGroup.totalSum += item.sum / 100;
  });

  return Array.from(profileMap.values());
}

export const getGroupShops = async (date: DateRange) => {
  const group_id = await getCurrentUserGroupId();
  const user_id = await getCurentUserId();

  const { data: profiles } = await createClient()
    .from('profile')
    .select('*')
    .eq('group_id', group_id);

  const { data } = await createClient()
    .from('items')
    .select(
      `
      *,
      categories (*),
      shops (*),
      profile (*)
    `
    )
    .in(
      'profile_id',
      profiles!.map((p) => p.id)
    )
    .gte('created_at', date.from?.toISOString()) // Дата больше или равна "from"
    .lte('created_at', date.to?.toISOString()); // Дата меньше или равна "to";

  console.log(groupPurchasesByProfile(data!, user_id));

  return groupPurchasesByProfile(data!, user_id);
};

import { createClient } from './client';
import { getCurrentUserGroupId } from './getCurrentUserGroupId';
import { getCurentUserId } from './getCurentUserId';
import { PurchaseItem } from '@/shared/types/shopGroup';
import { DateRange } from 'react-day-picker';
import { getShopRealName } from '@/shared/utils/getShopRealName';

function markCurrentUserItems(items: PurchaseItem[], currentUserId: string): PurchaseItem[] {
  return items.map((purchase) => ({
    ...purchase,
    profile: {
      ...purchase.profile,
      isCurrentUser: purchase.profile.id === currentUserId,
    },
    shops: {
      ...purchase.shops,
      name: getShopRealName(purchase.shops.name),
    },
    sum: purchase.sum / 100,
  }));
}

export const getReceiptItems = async (date: DateRange) => {
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

  const result = markCurrentUserItems(data!, user_id);

  return result as PurchaseItem[];
};

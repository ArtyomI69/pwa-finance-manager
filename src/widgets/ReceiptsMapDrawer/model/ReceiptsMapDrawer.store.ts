import { getGroupShops } from '@/shared/API/supabase/getGroupShops';
import { GroupedProfile, GroupedShop } from '@/shared/types/shopGroup';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const ReceiptsMapDrawerGate = createGate();

const $groupedProfile = createStore<GroupedProfile[]>([]);
const $currentUserShops = createStore<GroupedShop[]>([]);

const fetchPersonalStoresFx = createEffect(async () => {
  return await getGroupShops();
});

sample({
  clock: ReceiptsMapDrawerGate.open,
  target: fetchPersonalStoresFx,
});

sample({
  clock: fetchPersonalStoresFx.doneData,
  target: $groupedProfile,
});

sample({
  clock: $groupedProfile,
  target: $currentUserShops,
  fn: (grouped) => grouped.find((groupedProf) => groupedProf.profile.isCurrentUser)!.shops,
});

export { $currentUserShops, $groupedProfile, ReceiptsMapDrawerGate };

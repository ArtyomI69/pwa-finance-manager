import { getUserShops } from '@/shared/API/supabase/getUserShops';
import { GroupedByShop } from '@/shared/types/groupedByShop';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { debug } from 'patronum/debug';

const ReceiptsPersonalDrawerListGate = createGate();

const $shops = createStore<GroupedByShop[]>([]);

const fetchPersonalStoresFx = createEffect(async () => {
  return await getUserShops();
});

sample({
  clock: ReceiptsPersonalDrawerListGate.open,
  target: fetchPersonalStoresFx,
});

sample({
  clock: fetchPersonalStoresFx.doneData,
  target: $shops,
});

export { $shops, ReceiptsPersonalDrawerListGate };

debug($shops);

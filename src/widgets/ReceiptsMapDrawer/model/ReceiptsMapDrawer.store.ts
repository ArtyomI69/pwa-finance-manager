import { setPlaceMarks } from '@/features/ReceiptsMap';
import { getGroupShops } from '@/shared/API/supabase/getGroupShops';
import { GroupedProfile, GroupedShop } from '@/shared/types/shopGroup';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const ReceiptsMapDrawerGate = createGate();

const openPersonalTabEv = createEvent();
const openGroupTabEv = createEvent();

const $groupedProfiles = createStore<GroupedProfile[]>([]);
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
  target: $groupedProfiles,
});

sample({
  clock: $groupedProfiles,
  target: $currentUserShops,
  fn: (grouped) => grouped.find((groupedProf) => groupedProf.profile.isCurrentUser)!.shops,
});

sample({
  clock: [openPersonalTabEv, $currentUserShops],
  source: $currentUserShops,
  target: setPlaceMarks,
});

sample({
  clock: openGroupTabEv,
  source: $groupedProfiles,
  fn: (groupedProf) => groupedProf.flatMap((prof) => prof.shops),
  target: setPlaceMarks,
});

export {
  $currentUserShops,
  $groupedProfiles,
  ReceiptsMapDrawerGate,
  openGroupTabEv,
  openPersonalTabEv,
  fetchPersonalStoresFx,
};

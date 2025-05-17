import { setPlaceMarks } from '@/features/ReceiptsMap';
import { getGroupShops } from '@/shared/API/supabase/getGroupShops';
import { GroupedProfile, GroupedShop } from '@/shared/types/shopGroup';
import { subDays } from 'date-fns';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { DateRange } from 'react-day-picker';

const ReceiptsMapDrawerGate = createGate();

const openPersonalTabEv = createEvent();
const openGroupTabEv = createEvent();
const onDateChangeEv = createEvent<DateRange>();

const $groupedProfiles = createStore<GroupedProfile[]>([]);
const $currentUserShops = createStore<GroupedShop[]>([]);

const fetchGroupedProfilesOnMountFx = createEffect(async () => {
  return await getGroupShops({ from: subDays(new Date(Date.now()), 7), to: new Date() });
});

const onDateChangeFx = createEffect(async (date: DateRange) => {
  if (!date.to) date.to = date.from;
  return await getGroupShops(date);
});

sample({
  clock: ReceiptsMapDrawerGate.open,
  target: fetchGroupedProfilesOnMountFx,
});

sample({
  clock: fetchGroupedProfilesOnMountFx.doneData,
  target: $groupedProfiles,
});

sample({ clock: onDateChangeEv, target: onDateChangeFx });

sample({
  clock: onDateChangeFx.doneData,
  target: $groupedProfiles,
});

sample({
  clock: $groupedProfiles,
  target: $currentUserShops,
  fn: (grouped) => grouped.find((groupedProf) => groupedProf.profile.isCurrentUser)?.shops ?? [],
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
  fetchGroupedProfilesOnMountFx,
  onDateChangeEv,
};

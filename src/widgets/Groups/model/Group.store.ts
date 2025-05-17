import { getAllUsersInGroup } from '@/shared/API/supabase/getAllUsersInGroup';
import { Profile } from '@/shared/types/profile';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const GroupGate = createGate();

const $users = createStore<Profile[]>([]);

const getAllUsersInGroupFx = createEffect(async () => {
  return await getAllUsersInGroup();
});

sample({
  clock: GroupGate.open,
  target: getAllUsersInGroupFx,
});

sample({
  clock: getAllUsersInGroupFx.doneData,
  target: $users,
});

export { $users, GroupGate };

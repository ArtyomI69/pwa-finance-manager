import { getAllUsersInGroup } from '@/shared/API/supabase/getAllUsersInGroup';
import { Profile } from '@/shared/types/profile';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const GroupGate = createGate();

const $users = createStore<Profile[]>([]);
const $isOwner = createStore<boolean>(false);
const $groupId = createStore<string>('');

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

sample({
  clock: $users,
  fn: (users) => Boolean(users.find((user) => user.isCurrentUser && user.id === user.group_id)),
  target: $isOwner,
});

sample({
  clock: $users,
  fn: (users) => users[0]?.group_id ?? '',
  target: $groupId,
});

export { $groupId, $isOwner, $users, GroupGate, getAllUsersInGroupFx };

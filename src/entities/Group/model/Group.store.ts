import { getAllUsersInGroup } from '@/shared/API/supabase/getAllUsersInGroup';
import { kickFromGroup } from '@/shared/API/supabase/kickFromGroup';
import { makeGroupLeader } from '@/shared/API/supabase/makeGroupLeader';
import { Profile } from '@/shared/types/profile';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const GroupGate = createGate();

const kickFromGroupEv = createEvent<string>();
const makeGroupLeaderEv = createEvent<string>();

const $users = createStore<Profile[]>([]);
const $isOwner = createStore<boolean>(false);
const $groupId = createStore<string>('');

const getAllUsersInGroupFx = createEffect(async () => {
  return await getAllUsersInGroup();
});

const kickFromGroupFx = createEffect(async (id: string) => {
  await kickFromGroup(id);
});

const makeGroupLeaderFx = createEffect(async (id: string) => {
  await makeGroupLeader(id);
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
  clock: kickFromGroupEv,
  target: kickFromGroupFx,
});

sample({
  clock: makeGroupLeaderEv,
  target: makeGroupLeaderFx,
});

sample({
  clock: [kickFromGroupFx.done, makeGroupLeaderFx.done],
  target: getAllUsersInGroupFx,
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

export {
  $groupId,
  $isOwner,
  $users,
  GroupGate,
  getAllUsersInGroupFx,
  kickFromGroupEv,
  makeGroupLeaderEv,
};

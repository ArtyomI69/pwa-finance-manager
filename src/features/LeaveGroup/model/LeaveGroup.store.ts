import { getAllUsersInGroupFx } from '@/entities/Group/model/Group.store';
import { leaveGroup } from '@/shared/API/supabase/leaveGroup';
import { toastLoading } from '@/shared/lib/toastLoading';
import { createEffect, createEvent, sample } from 'effector';

const leaveGroupEv = createEvent();

const leaveGroupFx = createEffect(async () => {
  await toastLoading(leaveGroup);
});

sample({
  clock: leaveGroupEv,
  target: leaveGroupFx,
});

sample({
  clock: leaveGroupFx.done,
  target: getAllUsersInGroupFx,
});

export { leaveGroupEv };

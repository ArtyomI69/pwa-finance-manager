import { acceptInvitation } from '@/shared/API/supabase/acceptInvitation';
import { getInvitations } from '@/shared/API/supabase/getInvitations';
import { removeInvitation } from '@/shared/API/supabase/removeInvitation';
import { toastLoading } from '@/shared/lib/toastLoading';
import { Invitation } from '@/shared/types/invitation';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const InvitationsTabGate = createGate();

const rejectInvitationEv = createEvent<number>();
const acceptInvitationEv = createEvent<{
  invitationId: number;
  newGroupId: string;
}>();

const $invitations = createStore<Invitation[]>([]);

const getInvitationsFx = createEffect(async () => {
  return await getInvitations();
});

const rejectInvitationFx = createEffect(async (invitationId: number) => {
  await toastLoading(removeInvitation, invitationId);
});

const acceptInvitationFx = createEffect(
  async ({ invitationId, newGroupId }: { invitationId: number; newGroupId: string }) => {
    await toastLoading(acceptInvitation, { newGroupId, invitationId });
  }
);

sample({
  clock: InvitationsTabGate.open,
  target: getInvitationsFx,
});

sample({
  clock: getInvitationsFx.doneData,
  target: $invitations,
});

sample({
  clock: rejectInvitationEv,
  target: rejectInvitationFx,
});

sample({
  clock: acceptInvitationEv,
  target: acceptInvitationFx,
});

sample({
  clock: [rejectInvitationFx.done, acceptInvitationFx.done],
  target: getInvitationsFx,
});

export {
  $invitations,
  InvitationsTabGate,
  getInvitationsFx,
  rejectInvitationEv,
  acceptInvitationEv,
};

import { getInvitations } from '@/shared/API/supabase/getInvitations';
import { rejectInvitation } from '@/shared/API/supabase/rejectInvitation';
import { toastLoading } from '@/shared/lib/toastLoading';
import { Invitation } from '@/shared/types/invitation';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const InvitationsTabGate = createGate();

const rejectInvitationEv = createEvent<number>();

const $invitations = createStore<Invitation[]>([]);

const getInvitationsFx = createEffect(async () => {
  return await getInvitations();
});

const rejectInvitationFx = createEffect(async (invitationId: number) => {
  await toastLoading(rejectInvitation, invitationId);
});

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
  clock: rejectInvitationFx.done,
  target: getInvitationsFx,
});

export { $invitations, InvitationsTabGate, getInvitationsFx, rejectInvitationEv };

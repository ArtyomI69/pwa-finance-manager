import { getInvitations } from '@/shared/API/supabase/getInvitations';
import { Invitation } from '@/shared/types/invitation';
import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const InvitationsTabGate = createGate();

const $invitations = createStore<Invitation[]>([]);

const getInvitationsFx = createEffect(async () => {
  return await getInvitations();
});

sample({
  clock: InvitationsTabGate.open,
  target: getInvitationsFx,
});

sample({
  clock: getInvitationsFx.doneData,
  target: $invitations,
});

export { $invitations, InvitationsTabGate, getInvitationsFx };

import { createClient } from './client';

export const rejectInvitation = async (invitationId: number) => {
  await createClient().from('invitations').delete().eq('id', invitationId);
};

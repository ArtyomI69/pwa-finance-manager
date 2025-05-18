import { createClient } from './client';

export const removeInvitation = async (invitationId: number) => {
  await createClient().from('invitations').delete().eq('id', invitationId);
};

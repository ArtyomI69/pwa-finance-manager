import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';
import { removeInvitation } from './removeInvitation';

export const acceptInvitation = async ({
  invitationId,
  newGroupId,
}: {
  invitationId: number;
  newGroupId: string;
}) => {
  const currentUserId = await getCurentUserId();
  const { error } = await createClient()
    .from('profile')
    .update({ group_id: newGroupId })
    .eq('id', currentUserId);

  if (!error) {
    await removeInvitation(invitationId);
  }
};

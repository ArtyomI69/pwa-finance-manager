import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';

export const leaveGroup = async () => {
  const currentUserId = await getCurentUserId();
  await createClient().from('profile').update({ group_id: currentUserId }).eq('id', currentUserId);
};

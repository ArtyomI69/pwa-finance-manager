import { createClient } from './client';
import { getCurrentUserGroupId } from './getCurrentUserGroupId';

export const makeGroupLeader = async (userId: string) => {
  const group_id = await getCurrentUserGroupId();

  await createClient().from('profile').update({ group_id: userId }).eq('group_id', group_id);
};

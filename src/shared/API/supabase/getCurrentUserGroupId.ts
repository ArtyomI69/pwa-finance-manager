import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';

export const getCurrentUserGroupId = async () => {
  const id = await getCurentUserId();
  const { data } = await createClient().from('profile').select('group_id').eq('id', id).single();
  return data!.group_id;
};

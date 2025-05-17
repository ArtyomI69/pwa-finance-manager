import { Profile } from '@/shared/types/profile';
import { createClient } from './client';
import { getCurrentUserGroupId } from './getCurrentUserGroupId';
import { getCurentUserId } from './getCurentUserId';

export const getAllUsersInGroup = async () => {
  const group_id = await getCurrentUserGroupId();
  const currentUserId = await getCurentUserId();
  let { data: profile } = await createClient().from('profile').select('*').eq('group_id', group_id);
  return profile?.map((profile) => ({
    ...profile,
    isCurrentUser: currentUserId === profile.id,
  })) as Profile[];
};

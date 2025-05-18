import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';
import { getCurrentUserGroupId } from './getCurrentUserGroupId';

export const inviteUserToGroup = async (email: string) => {
  const from_profile = await getCurentUserId();
  const group_id = await getCurrentUserGroupId();
  const { data } = await createClient()
    .from('profile')
    .select('id')
    .eq('email', email.toLocaleLowerCase())
    .single();
  const to_profile = data?.id;
  return await createClient()
    .from('invitations')
    .insert([{ from_profile, to_profile, group_id }])
    .select();
};

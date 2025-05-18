import { Invitation } from '@/shared/types/invitation';
import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';

export const getInvitations = async () => {
  const currentUserId = await getCurentUserId();
  const { data } = await createClient()
    .from('invitations')
    .select(
      `
    *,
    from_profile:profile!invitations_from_profile_fkey(*),
    to_profile:profile!invitations_to_profile_fkey(*)
  `
    )
    .eq('to_profile', currentUserId);

  return data as Invitation[];
};

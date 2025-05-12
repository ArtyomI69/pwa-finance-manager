import { createClient } from './client';

export const updateProfilePhoto = async (avatar_url: string) => {
  return await createClient().auth.updateUser({ data: { avatar_url } });
};

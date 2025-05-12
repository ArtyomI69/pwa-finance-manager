import { getLastItemUrl } from '@/shared/utils/getLastItemUrlArray';
import { createClient } from './client';

export const deleteProfilePhotoStorage = async (avatar_url: string) => {
  const fileName = getLastItemUrl(avatar_url);

  return await createClient().storage.from('avatars').remove([fileName]);
};

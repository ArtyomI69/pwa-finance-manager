import { createClient } from './client';

export const getPublicUrlAvatars = async (fileName: string) => {
  const {
    data: { publicUrl },
  } = createClient().storage.from('avatars').getPublicUrl(fileName);

  return publicUrl;
};

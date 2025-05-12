import { createClient } from './client';

export const deleteProfilePhotoStorage = async (avatar_url: string) => {
  const urlArray = avatar_url.split('/');
  const fileName = urlArray[urlArray.length - 1];

  console.log(fileName);

  return await createClient().storage.from('avatars').remove([fileName]);
};

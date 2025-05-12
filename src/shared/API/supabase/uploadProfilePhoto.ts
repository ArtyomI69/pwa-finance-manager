import { createClient } from './client';

export const uploadProfilePhotoStorage = async (filename: string, file: File) => {
  return await createClient().storage.from('avatars').upload(filename, file);
};

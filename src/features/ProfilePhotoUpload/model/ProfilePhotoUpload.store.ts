import { $profileImage, setImageEv } from '@/entities/CurrentUserAvatar';
import { deleteProfilePhotoStorage } from '@/shared/API/supabase/deleteProfilePhotoStorage';
import { getPublicUrlAvatars } from '@/shared/API/supabase/getPublicUrlAvatars';
import { updateProfilePhoto } from '@/shared/API/supabase/updateProfilePhoto';
import { uploadProfilePhotoStorage } from '@/shared/API/supabase/uploadProfilePhotoStorage';
import { toastLoading } from '@/shared/lib/toastLoading';
import { createEffect, createEvent, sample } from 'effector';
import { toast } from 'sonner';

const updateProfilePhotoEv = createEvent<File>();
const deleteOldProfilePhotoEv = createEvent<string>();
const deleteCurrentProfilePhotoEv = createEvent();

const updateProfilePhotoFx = createEffect(async (file: File) => {
  const oldProfileImage = $profileImage.getState();

  const filename = `avatar_${Date.now()}.png`;
  const { error: errorStorage } = await toastLoading(uploadProfilePhotoStorage, filename, file);

  if (errorStorage) {
    toast.error('Произошла ошибка при загрузке файла в хранилище');
    throw new Error('Произошла ошибка при загрузке файла');
  }

  const uploadedFilePublicUrl = await toastLoading(getPublicUrlAvatars, filename);

  const { error } = await toastLoading(updateProfilePhoto, uploadedFilePublicUrl);

  if (error) {
    toast.error('Произошла ошибка при загрузке файла');
    throw new Error('Произошла ошибка при загрузке файла');
  }

  setImageEv(URL.createObjectURL(file));

  return oldProfileImage;
});

const deleteOldProfilePhotoFx = createEffect(async (avatar_url: string) => {
  await deleteProfilePhotoStorage(avatar_url);
});

const deleteCurrentProfilePhotoFx = createEffect(async (avatar_url: string) => {
  const { error: errorStorage } = await toastLoading(deleteProfilePhotoStorage, avatar_url);

  if (errorStorage) {
    toast.error('Произошла ошибка при удалении аватара в хранилище');
    throw new Error('Произошла ошибка при удалении аватара в хранилище');
  }

  const { error: errorProfile } = await toastLoading(updateProfilePhoto, '');

  if (errorProfile) {
    toast.error('Произошла ошибка при удалении аватара');
    throw new Error('Произошла ошибка при удалении аватара');
  }

  setImageEv('');
});

sample({ clock: updateProfilePhotoEv, target: updateProfilePhotoFx });

sample({
  clock: updateProfilePhotoFx.doneData,
  target: deleteOldProfilePhotoEv,
});

sample({ clock: deleteOldProfilePhotoEv, target: deleteOldProfilePhotoFx });

sample({
  clock: deleteCurrentProfilePhotoEv,
  source: $profileImage,
  target: deleteCurrentProfilePhotoFx,
});

export { updateProfilePhotoEv, deleteCurrentProfilePhotoEv };

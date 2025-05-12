import { setImageEv } from '@/entities/CurrentUserAvatar';
import { getPublicUrlAvatars } from '@/shared/API/supabase/getPublicUrlAvatars';
import { updateProfile } from '@/shared/API/supabase/updateProfile';
import { updateProfilePhoto } from '@/shared/API/supabase/updateProfilePhoto';
import { uploadProfilePhotoStorage } from '@/shared/API/supabase/uploadProfilePhoto';
import { createEffect, createEvent, sample } from 'effector';
import { toast } from 'sonner';

const updateProfilePhotoEv = createEvent<File>();

const updateProfilePhotoFx = createEffect(async (file: File) => {
  const filename = `avatar_${Date.now()}.png`;
  const { error: errorStorage } = await uploadProfilePhotoStorage(filename, file);

  if (errorStorage) {
    toast.error('Произошла ошибка при загрузке файла в хранилище');
    return;
  }

  const uploadedFilePublicUrl = await getPublicUrlAvatars(filename);

  const { error } = await updateProfilePhoto(uploadedFilePublicUrl);

  if (error) {
    toast.error('Произошла ошибка при загрузке файла');
    return;
  }

  setImageEv(URL.createObjectURL(file));
});

sample({ clock: updateProfilePhotoEv, target: updateProfilePhotoFx });

export { updateProfilePhotoEv };

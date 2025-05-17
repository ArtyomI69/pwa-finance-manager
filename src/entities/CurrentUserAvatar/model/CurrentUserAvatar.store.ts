import { getProfile } from '@/shared/API/supabase/getProfile';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const CurrentUserAvatarGate = createGate();

const setImageEv = createEvent<string>();

const $profileImage = createStore<string>('', { skipVoid: false });
const $name = createStore<string>('', { skipVoid: false });

const getProfileImageFx = createEffect(async () => {
  const { avatar_url } = await getProfile();

  return avatar_url;
});

const getInitialsFx = createEffect(async () => {
  const { name } = await getProfile();

  return name;
});

sample({
  clock: setImageEv,
  target: $profileImage,
});

sample({
  clock: CurrentUserAvatarGate.open,
  target: [getProfileImageFx, getInitialsFx],
});

sample({
  clock: getInitialsFx.doneData,
  target: $name,
});

sample({
  clock: getProfileImageFx.doneData,
  target: $profileImage,
});

export { CurrentUserAvatarGate, $name, $profileImage, setImageEv };

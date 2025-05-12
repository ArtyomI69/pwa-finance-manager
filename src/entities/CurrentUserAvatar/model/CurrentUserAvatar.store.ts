import { getProfile } from '@/shared/API/supabase/getProfile';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { debug } from 'patronum/debug';

const CurrentUserAvatarGate = createGate();

const setImageEv = createEvent<string>();

const $profileImage = createStore<string>('', { skipVoid: false });
const $initials = createStore<string>('', { skipVoid: false });

const getProfileImageFx = createEffect(async () => {
  const { avatar_url } = await getProfile();

  return avatar_url;
});

const getInitialsFx = createEffect(async () => {
  const { name } = await getProfile();

  const initials = name
    ?.split(' ')
    ?.map((word) => word[0])
    ?.join('')
    ?.toUpperCase();

  return initials;
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
  target: $initials,
});

sample({
  clock: getProfileImageFx.doneData,
  target: $profileImage,
});

export { CurrentUserAvatarGate, $initials, $profileImage, setImageEv };

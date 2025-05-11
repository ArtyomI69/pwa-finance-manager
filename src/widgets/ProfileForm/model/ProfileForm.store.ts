import { createStore, createEffect, createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import { getProfile } from '@/shared/API/supabase/getProfile';

const ProfileFormGate = createGate();

const $email = createStore<string>('');
const $name = createStore<string>('');

const getProfileFx = createEffect(async () => {
  const { name, email } = await getProfile();

  return { name, email };
});

sample({ clock: ProfileFormGate.open, target: getProfileFx });

$name.on(getProfileFx.doneData, (_, { name }) => name);
$email.on(getProfileFx.doneData, (_, { email }) => email);

export { $email, $name, ProfileFormGate, getProfileFx };

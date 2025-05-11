import { createStore, createEffect, createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import { getProfile } from '@/shared/API/supabase/getProfile';
import { updateProfile } from '@/shared/API/supabase/updateProfile';
import { toast } from 'sonner';

const ProfileFormGate = createGate();

const updateProfileEv = createEvent<{
  email: string;
  name: string;
  password?: string;
}>();

const $email = createStore<string>('');
const $name = createStore<string>('');

const getProfileFx = createEffect(async () => {
  const { name, email } = await getProfile();

  return { name, email };
});

const updateProfileFx = createEffect(
  async ({ email, name, password }: { email: string; name: string; password?: string }) => {
    const { error } = await updateProfile({ email, name, password });

    if (error?.status === 422) {
      toast.error('Новый пароль совпадает с предыдущим');
      return;
    }

    if (error) {
      toast.error('Произошла ошибка при обновлении профиля. Попробуйте позже');
      return;
    }

    toast.success('Профиль успешно обновлён');
    if (email !== $email.getState())
      toast.success('На новую почту было отправлено письмо с подтверждением на изменении email');
  }
);

sample({ clock: ProfileFormGate.open, target: getProfileFx });

$name.on(getProfileFx.doneData, (_, { name }) => name);
$email.on(getProfileFx.doneData, (_, { email }) => email);

sample({
  clock: updateProfileEv,
  target: updateProfileFx,
});

export { $email, $name, ProfileFormGate, getProfileFx, updateProfileEv };

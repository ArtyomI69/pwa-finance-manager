import { login } from '@/shared/API/supabase';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { toastLoading } from '@/shared/lib/toastLoading';
import { createEvent, createEffect, sample } from 'effector';
import { toast } from 'sonner';

interface ILoginData {
  email: string;
  password: string;
}

const loginEv = createEvent<ILoginData>();

const loginFx = createEffect(async ({ email, password }: ILoginData) => {
  const { error } = await toastLoading(login, { email, password });

  if (error) {
    toast.error('Введён не правильный email или пароль');
    return;
  }

  location.href = AppRoutes.Receipts;
});

sample({ clock: loginEv, target: loginFx });

export { loginEv };

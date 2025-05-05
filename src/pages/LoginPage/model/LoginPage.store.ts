import { login } from '@/shared/API/supabase';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { createEvent, createEffect, sample } from 'effector';

interface ILogin {
  email: string;
  password: string;
}

const loginEv = createEvent<ILogin>();

const loginFx = createEffect(async ({ email, password }: ILogin) => {
  await login({ email, password });
  location.href = AppRoutes.Receipts;
});

sample({ clock: loginEv, target: loginFx });

export { loginEv };

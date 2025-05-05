import { login } from '@/shared/API/supabase';
import { createEvent, createEffect, sample } from 'effector';

interface ILogin {
  email: string;
  password: string;
}

const loginEv = createEvent<ILogin>();

const loginFx = createEffect(async ({ email, password }: ILogin) => {
  login({ email, password });
});

sample({ clock: loginEv, target: loginFx });

export { loginEv };

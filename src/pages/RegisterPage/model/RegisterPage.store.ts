import { signUp } from '@/shared/API/supabase';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { toastLoading } from '@/shared/utils/toastLoading';
import { createEvent, createEffect, sample } from 'effector';
import { toast } from 'sonner';

interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

const registerEv = createEvent<IRegisterData>();

const registerFx = createEffect(async ({ email, password, name }: IRegisterData) => {
  const { error } = await toastLoading(signUp, { email, name, password });

  if (error?.status === 400) {
    toast.error('Электронной почты с таким адрессом не существует', {
      duration: 10000,
    });
    return;
  }

  if (error) {
    toast.error('Электронная почта с данным адрессом уже занята', {
      duration: 10000,
    });
    return;
  }

  toast.success('На вашу почту было отправлено письмо!', { duration: 10000 });
});

sample({ clock: registerEv, target: registerFx });

export { registerEv };

import { logout } from '@/shared/API/supabase/logout';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { toastLoading } from '@/shared/lib/toastLoading';
import { createEffect, createEvent, sample } from 'effector';
import { toast } from 'sonner';

const logoutEv = createEvent();

const logoutFx = createEffect(async () => {
  const { error } = await toastLoading(logout);
  if (error) {
    toast.error('Не удалось выйти из аккаунта');
    return;
  }
  location.href = AppRoutes.Login;
});

sample({ clock: logoutEv, target: logoutFx });

export { logoutEv };

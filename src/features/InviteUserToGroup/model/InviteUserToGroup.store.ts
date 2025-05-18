import { inviteUserToGroup } from '@/shared/API/supabase/inviteUserToGroup';
import { toastLoading } from '@/shared/lib/toastLoading';
import { createEffect, createEvent, sample } from 'effector';
import { toast } from 'sonner';

const inviteUserToGroupEv = createEvent<string>();

const inviteUserToGroupFx = createEffect(async (email: string) => {
  const { error } = await toastLoading(inviteUserToGroup, email);
  if (error) {
    toast.error('Пользователя с таким email не существует или приглашение ему уже отправлено');
    return;
  }

  toast.success('Приглашение успешно отправлено');
});

sample({
  clock: inviteUserToGroupEv,
  target: inviteUserToGroupFx,
});

export { inviteUserToGroupEv };

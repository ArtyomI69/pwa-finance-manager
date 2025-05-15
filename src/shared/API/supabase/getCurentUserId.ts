import { createClient } from './client';

export const getCurentUserId = async () => {
  const user = await createClient().auth.getUser();
  const id = user.data.user?.id;

  return id as string;
};

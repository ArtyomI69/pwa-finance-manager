import { createClient } from './client';

export const getUserId = async () => {
  const user = await createClient().auth.getUser();
  const id = user.data.user?.id;

  return id as string;
};

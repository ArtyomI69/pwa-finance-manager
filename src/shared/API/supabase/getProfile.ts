import { createClient } from './client';

export const getProfile = async () => {
  const user = await createClient().auth.getUser();
  const email = user.data.user?.email;
  const name = user.data.user?.user_metadata.name;

  return { email, name };
};

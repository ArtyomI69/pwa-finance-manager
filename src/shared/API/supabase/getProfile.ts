import { createClient } from './client';

export const getProfile = async () => {
  const user = await createClient().auth.getUser();
  const email = user.data.user?.email as string;
  const name = user.data.user?.user_metadata.name as string;
  const avatar_url = user.data.user?.user_metadata.avatar_url as string;

  return { email, name, avatar_url };
};

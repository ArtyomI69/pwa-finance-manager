import { createClient } from './client';

export const signUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const supabase = createClient();

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
};

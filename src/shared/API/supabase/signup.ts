import { createClient } from './client';

export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const supabase = createClient();

  return await supabase.auth.signUp({
    email,
    password,
  });
};

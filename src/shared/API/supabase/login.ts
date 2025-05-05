import { createClient } from './client';

export const login = async ({ email, password }: { email: string; password: string }) => {
  const supabase = createClient();

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

import { createClient } from './client';

export const getSession = async () => {
  const supabase = createClient();

  return await supabase.auth.getSession();
};

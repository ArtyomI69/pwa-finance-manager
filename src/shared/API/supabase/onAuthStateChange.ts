import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createClient } from './client';

export const onAuthStateChange = (
  callback: (event: AuthChangeEvent, session: Session | null) => void | Promise<void>
) => {
  const supabase = createClient();

  return supabase.auth.onAuthStateChange(callback);
};

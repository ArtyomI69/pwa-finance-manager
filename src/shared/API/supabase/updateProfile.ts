import { createClient } from './client';
import { getSession } from './getSession';

export const getProfile = async () => {
  const supabase = createClient();

  const id = (await getSession()).data.session?.user.id;

  let { data: profile } = await supabase.from('profile').select('*').eq('id', id);

  return profile![0] as { name: string; email: string };
};

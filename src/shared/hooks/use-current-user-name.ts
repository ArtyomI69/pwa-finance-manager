import { useEffect, useState } from 'react';
import { createClient } from '../API/supabase/client';

export const useCurrentUserName = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileName = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error(error);
      }

      let { data: profile } = await createClient()
        .from('profile')
        .select('name')
        .eq('id', data.session?.user.id);

      setName(profile![0].name ?? '?');
    };

    fetchProfileName();
  }, []);

  return name || '?';
};

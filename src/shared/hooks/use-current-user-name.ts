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

      setName(data.session?.user.user_metadata.user_name ?? '?');
    };

    fetchProfileName();
  }, []);

  return name || '?';
};

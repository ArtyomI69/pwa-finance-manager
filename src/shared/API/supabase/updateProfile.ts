import { UserAttributes } from '@supabase/supabase-js';
import { createClient } from './client';

export const updateProfile = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password?: string;
}) => {
  let newProfileData: UserAttributes = {
    email,
    password,
    data: {
      name,
    },
  };

  if (!password) {
    newProfileData = {
      email,
      data: {
        name,
      },
    };
  }

  return await createClient().auth.updateUser(newProfileData);
};

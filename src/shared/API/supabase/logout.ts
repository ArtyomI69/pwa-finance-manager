import { createClient } from './client';

export const logout = async () => {
  return await createClient().auth.signOut();
};

import { createClient } from './client';

export const kickFromGroup = async (userId: string) => {
  await createClient().from('profile').update({ group_id: userId }).eq('id', userId);
};

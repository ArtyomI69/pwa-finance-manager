import { createClient } from './client';

export const deleteTransactions = async (ids: number[]) => {
  return await createClient().from('transactions').delete().in('id', ids);
};

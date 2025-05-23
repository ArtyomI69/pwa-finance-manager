import { Transaction } from '@/shared/types/transaction';
import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';

export const addTransactions = async (transactions: Transaction[]) => {
  const id = await getCurentUserId();
  return await createClient()
    .from('transactions')
    .insert(
      transactions.map(({ sum, category }) => ({
        sum,
        category,
        profile_id: id,
      }))
    );
};

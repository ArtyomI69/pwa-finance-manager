import { Transaction } from '@/shared/types/transaction';
import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';

export const addTransactions = async (transactions: Transaction[]) => {
  const id = await getCurentUserId();
  await createClient()
    .from('transactions')
    .insert(
      transactions.map(({ sum, category, created_at }) => ({
        sum,
        category,
        created_at,
        profile_id: id,
      }))
    );
};

import { Transaction } from '@/shared/types/transaction';
import { createClient } from './client';
import { getCurentUserId } from './getCurentUserId';
import { DateRange } from 'react-day-picker';
import { getCurrentUserGroupId } from './getCurrentUserGroupId';

function markCurrentUserTransactions(transactions: Transaction[], currentUserId: string) {
  return transactions.map((transaction) => ({
    ...transaction,
    profile: { ...transaction.profile, isCurrentUser: transaction.profile?.id === currentUserId },
  })) as Transaction[];
}

export const getTransactions = async (date: DateRange) => {
  const group_id = await getCurrentUserGroupId();
  const user_id = await getCurentUserId();

  const { data: profiles } = await createClient()
    .from('profile')
    .select('*')
    .eq('group_id', group_id);

  const { data } = await createClient()
    .from('transactions')
    .select(
      `
        *,
        profile (*)
      `
    )
    .in(
      'profile_id',
      profiles!.map((p) => p.id)
    )
    .gte('created_at', date.from?.toISOString()) // Дата больше или равна "from"
    .lte('created_at', date.to?.toISOString()); // Дата меньше или равна "to";

  return markCurrentUserTransactions(data!, user_id);
};

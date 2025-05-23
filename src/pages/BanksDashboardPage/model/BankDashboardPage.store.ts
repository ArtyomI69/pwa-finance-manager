import { deleteTransactions } from '@/shared/API/supabase/deleteTransactions';
import { getTransactions } from '@/shared/API/supabase/getTransactions';
import { toastLoading } from '@/shared/lib/toastLoading';
import { Transaction } from '@/shared/types/transaction';
import { subDays } from 'date-fns';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { DateRange } from 'react-day-picker';

const BankDashboardPageGate = createGate();
const onDateChangeEv = createEvent<DateRange>();
const deleteTransactionsEv = createEvent<Transaction[]>();

const $transactions = createStore<Transaction[]>([]);
const $personalTransactions = createStore<Transaction[]>([]);

const fetchTransactionsFx = createEffect(async () => {
  return await getTransactions({ from: subDays(new Date(Date.now()), 7), to: new Date() });
});

const onDateChangeFx = createEffect(async (date: DateRange) => {
  if (!date.to) date.to = date.from;
  return await getTransactions(date);
});

const deleteTransactionsFx = createEffect(async (Transactions: Transaction[]) => {
  await toastLoading(
    deleteTransactions,
    Transactions.map((transaction) => transaction.id)
  );
});

sample({
  clock: deleteTransactionsEv,
  target: deleteTransactionsFx,
});

sample({
  clock: [BankDashboardPageGate.open, deleteTransactionsFx.done],
  target: fetchTransactionsFx,
});

sample({
  clock: fetchTransactionsFx.doneData,
  target: $transactions,
});

sample({ clock: onDateChangeEv, target: onDateChangeFx });

sample({
  clock: onDateChangeFx.doneData,
  target: $transactions,
});

sample({
  clock: $transactions,
  fn: (Transactions) => Transactions.filter((Transaction) => Transaction.profile.isCurrentUser),
  target: $personalTransactions,
});

export {
  $transactions,
  $personalTransactions,
  fetchTransactionsFx,
  onDateChangeEv,
  BankDashboardPageGate,
  deleteTransactionsEv,
};

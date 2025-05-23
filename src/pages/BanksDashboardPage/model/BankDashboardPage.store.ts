import { deleteTransactions } from '@/shared/API/supabase/deleteTransactions';
import { getTransactions } from '@/shared/API/supabase/getTransactions';
import { toastLoading } from '@/shared/lib/toastLoading';
import { Transaction } from '@/shared/types/transaction';
import { subDays } from 'date-fns';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { DateRange } from 'react-day-picker';
import pdfToText from 'react-pdftotext';
import { extractTransactions } from './extractTransactions';
import { toast } from 'sonner';
import { addTransactions } from '@/shared/API/supabase/addTransactions';
import { tr } from 'date-fns/locale';

const BankDashboardPageGate = createGate();
const onDateChangeEv = createEvent<DateRange>();
const deleteTransactionsEv = createEvent<Transaction[]>();
const addSberbankStatementEv = createEvent<File>();

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

const addSberbankStatementFx = createEffect(async (file: File) => {
  const text = await pdfToText(file);
  const isSberbankStatement = text
    .split('Расшифровка операций')[0]
    .includes('Зайдите в приложение СберБанк Онлайн в раздел «Выписки и справки»');

  if (!isSberbankStatement) {
    toast.error('Данный файл не является выпиской из Сбербанка');
    throw new Error('Данный файл не является выпиской из Сбербанка');
  }
  const bankStatementText = text.split('Расшифровка операций')[1];
  const transactions = extractTransactions(bankStatementText);
  await addTransactions(transactions);
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

sample({
  clock: addSberbankStatementEv,
  target: addSberbankStatementFx,
});

sample({
  clock: addSberbankStatementFx.done,
  target: fetchTransactionsFx,
});

export {
  $transactions,
  $personalTransactions,
  fetchTransactionsFx,
  onDateChangeEv,
  BankDashboardPageGate,
  deleteTransactionsEv,
  addSberbankStatementEv,
};

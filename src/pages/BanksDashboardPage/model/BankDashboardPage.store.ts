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

const BankDashboardPageGate = createGate();
const onDateChangeEv = createEvent<DateRange>();
const deleteTransactionsEv = createEvent<Transaction[]>();
const addSberbankStatementEv = createEvent<File>();

const $date = createStore<DateRange>({ from: subDays(new Date(Date.now()), 7), to: new Date() });
const $transactions = createStore<Transaction[]>([]);
const $personalTransactions = createStore<Transaction[]>([]);

const fetchTransactionsFx = createEffect(async (date: DateRange) => {
  return await getTransactions(date);
});

const deleteTransactionsFx = createEffect(async (transactions: Transaction[]) => {
  await toastLoading(
    deleteTransactions,
    transactions.map((transaction) => transaction.id)
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
  const { error } = await toastLoading(addTransactions, transactions);
  if (!error) {
    toast.success('Выписка из банка успешно добавлена');
  }
});

sample({ clock: onDateChangeEv, target: $date });

sample({
  clock: deleteTransactionsEv,
  target: deleteTransactionsFx,
});

sample({
  clock: addSberbankStatementEv,
  target: addSberbankStatementFx,
});

sample({
  clock: [BankDashboardPageGate.open, deleteTransactionsFx.done],
  source: $date,
  target: fetchTransactionsFx,
});

sample({
  clock: $date,
  target: fetchTransactionsFx,
});

sample({
  clock: addSberbankStatementFx.done,
  source: $date,
  target: fetchTransactionsFx,
});

sample({
  clock: fetchTransactionsFx.doneData,
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
  addSberbankStatementEv,
};

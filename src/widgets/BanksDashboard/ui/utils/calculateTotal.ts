import { Transaction } from '@/shared/types/transaction';

export function calculateTotals(items: Transaction[]): {
  totalIncome: number;
  totalExpenses: number;
} {
  let totalIncome = 0;
  let totalExpenses = 0;

  items.forEach((transaction) => {
    if (transaction.sum > 0) {
      totalIncome += transaction.sum;
    } else {
      totalExpenses += Math.abs(transaction.sum); // Используем Math.abs чтобы получить положительное число
    }
  });

  return { totalIncome, totalExpenses };
}

import { Transaction } from '@/shared/types/transaction';

const INCOME_COLORS = [
  'bg-cyan-500 dark:bg-cyan-500',
  'bg-blue-500 dark:bg-blue-500',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-violet-500 dark:bg-violet-500',
  'bg-fuchsia-500 dark:bg-fuchsia-500',
  'bg-amber-500 dark:bg-amber-500',
  'bg-pink-500 dark:bg-pink-500',
  'bg-lime-500 dark:bg-lime-500',
];

export function groupIncomeByCategory(transactions: Transaction[]): {
  name: string;
  amount: number;
  share: string;
  color: string;
}[] {
  // Фильтруем только доходы (положительные суммы)
  const incomes = transactions.filter((t) => t.sum > 0);

  // Считаем общую сумму доходов
  const totalIncome = incomes.reduce((sum, t) => sum + t.sum, 0);

  // Группируем по категориям
  const categoryMap = new Map<string, number>();

  incomes.forEach((t) => {
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + t.sum);
  });

  // Сортируем категории по убыванию суммы
  const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);

  // Формируем результат с распределением цветов
  return sortedCategories.map(([name, amount], index) => {
    const share = totalIncome > 0 ? `${((amount / totalIncome) * 100).toFixed(1)}%` : '0%';

    // Циклически перебираем цвета
    const colorIndex = index % INCOME_COLORS.length;

    return {
      name,
      amount,
      share,
      color: INCOME_COLORS[colorIndex],
    };
  });
}

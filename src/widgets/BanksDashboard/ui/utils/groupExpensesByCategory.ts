import { Transaction } from '@/shared/types/transaction';

// Цвета для категорий (по порядку)
const CATEGORY_COLORS = [
  'bg-cyan-500 dark:bg-cyan-500',
  'bg-blue-500 dark:bg-blue-500',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-violet-500 dark:bg-violet-500',
  'bg-fuchsia-500 dark:bg-fuchsia-500',
  'bg-amber-500 dark:bg-amber-500',
  'bg-pink-500 dark:bg-pink-500',
  'bg-lime-500 dark:bg-lime-500',
];

export function groupExpensesByCategory(transactions: Transaction[]): {
  name: string;
  amount: number;
  share: string;
  color: string;
}[] {
  // Фильтруем только расходы (отрицательные суммы)
  const expenses = transactions.filter((t) => t.sum < 0);

  // Считаем общую сумму расходов
  const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.sum), 0);

  // Группируем по категориям
  const categoryMap = new Map<string, number>();

  expenses.forEach((t) => {
    const amount = Math.abs(t.sum);
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + amount);
  });

  // Преобразуем в массив объектов и сортируем по убыванию суммы
  const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);

  // Распределяем цвета по категориям
  return sortedCategories.map(([name, amount], index) => {
    const share = totalExpenses > 0 ? `${((amount / totalExpenses) * 100).toFixed(1)}%` : '0%';

    // Циклически перебираем цвета, если категорий больше чем цветов
    const colorIndex = index % CATEGORY_COLORS.length;

    return {
      name,
      amount,
      share,
      color: CATEGORY_COLORS[colorIndex],
    };
  });
}

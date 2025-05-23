import { Transaction } from '@/shared/types/transaction';

const USER_COLORS = [
  'bg-cyan-500 dark:bg-cyan-500',
  'bg-blue-500 dark:bg-blue-500',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-violet-500 dark:bg-violet-500',
  'bg-fuchsia-500 dark:bg-fuchsia-500',
  'bg-amber-500 dark:bg-amber-500',
  'bg-pink-500 dark:bg-pink-500',
  'bg-lime-500 dark:bg-lime-500',
];

export function groupIncomeByUser(transactions: Transaction[]): {
  name: string;
  amount: number;
  share: string;
  color: string;
}[] {
  // Фильтруем только доходы (положительные суммы)
  const incomes = transactions.filter((t) => t.sum > 0);

  // Считаем общую сумму доходов
  const totalIncome = incomes.reduce((sum, t) => sum + t.sum, 0);

  // Группируем по пользователям
  const userMap = new Map<string, { name: string; amount: number }>();

  incomes.forEach((t) => {
    const userId = t.profile.id;
    const current = userMap.get(userId) || { name: t.profile.name, amount: 0 };
    userMap.set(userId, {
      name: current.name,
      amount: current.amount + t.sum,
    });
  });

  // Сортируем пользователей по убыванию суммы доходов
  const sortedUsers = Array.from(userMap.entries()).sort((a, b) => b[1].amount - a[1].amount);

  // Формируем результат с распределением цветов
  return sortedUsers.map(([_, userData], index) => {
    const share = totalIncome > 0 ? `${((userData.amount / totalIncome) * 100).toFixed(1)}%` : '0%';

    // Циклически перебираем цвета
    const colorIndex = index % USER_COLORS.length;

    return {
      name: userData.name,
      amount: userData.amount,
      share,
      color: USER_COLORS[colorIndex],
    };
  });
}

export function getUserStats(items: any[]): {
  name: string;
  amount: number;
  share: string;
  color: string;
}[] {
  // Группируем товары по пользователям и суммируем суммы
  const userMap = new Map<string, { name: string; amount: number }>();

  items.forEach((item) => {
    const userId = item.profile_id;
    const currentAmount = userMap.get(userId)?.amount || 0;
    userMap.set(userId, {
      name: item.profile.name,
      amount: currentAmount + item.sum,
    });
  });

  // Преобразуем Map в массив
  const userStats = Array.from(userMap.values());

  // Вычисляем общую сумму для расчета долей
  const totalAmount = userStats.reduce((sum, item) => sum + item.amount, 0);

  // Массив цветов для пользователей
  const colors = [
    'bg-cyan-500 dark:bg-cyan-500', // cyan
    'bg-blue-500 dark:bg-blue-500', // blue
    'bg-emerald-500 dark:bg-emerald-500', // emerald
    'bg-violet-500 dark:bg-violet-500', // violet
    'bg-fuchsia-500 dark:bg-fuchsia-500', // fuchsia
    'bg-amber-500 dark:bg-amber-500', // amber
    'bg-pink-500 dark:bg-pink-500', // pink (замена rose)
    'bg-lime-500 dark:bg-lime-500', // lime (новый)
  ];

  // Сортируем по убыванию суммы
  const sortedStats = userStats.sort((a, b) => b.amount - a.amount);

  // Формируем результат
  const result = sortedStats.map((stat, index) => {
    const share = totalAmount > 0 ? ((stat.amount / totalAmount) * 100).toFixed(1) + '%' : '0%';

    // Используем цвет по индексу, циклически если пользователей больше чем цветов
    const colorIndex = index % colors.length;
    const color = colors[colorIndex];

    return {
      name: stat.name,
      amount: stat.amount,
      share: share,
      color: color,
    };
  });

  return result;
}

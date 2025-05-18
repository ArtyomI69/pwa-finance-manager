import { PurchaseItem } from '@/shared/types/shopGroup';

export function getShopStats(items: PurchaseItem[]): {
  name: string;
  amount: number;
  share: string;
  color: string;
}[] {
  // Группируем товары по магазинам и суммируем суммы
  const shopMap = new Map<number, { name: string; amount: number }>();

  items.forEach((item) => {
    const shopId = item.shop_id;
    const currentAmount = shopMap.get(shopId)?.amount || 0;
    shopMap.set(shopId, {
      name: item.shops.name + ' ' + item.shops.address,
      amount: currentAmount + item.sum,
    });
  });

  // Преобразуем Map в массив
  const shopStats = Array.from(shopMap.values());

  // Вычисляем общую сумму для расчета долей
  const totalAmount = shopStats.reduce((sum, item) => sum + item.amount, 0);

  // Массив цветов для магазинов (можно расширить по необходимости)
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
  const sortedStats = shopStats.sort((a, b) => b.amount - a.amount);

  // Формируем результат с расчетом долей и подбором цвета
  const result = sortedStats.map((stat, index) => {
    const share = totalAmount > 0 ? ((stat.amount / totalAmount) * 100).toFixed(1) + '%' : '0%';
    // Используем цвет по индексу, если цветов меньше чем магазинов - используем modulo
    const color = colors[index % colors.length];

    return {
      name: stat.name,
      amount: stat.amount,
      share: share,
      color: color,
    };
  });

  return result;
}

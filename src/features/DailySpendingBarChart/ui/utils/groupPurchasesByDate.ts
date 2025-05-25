import { PurchaseItem } from '@/shared/types/shopGroup';
import { DateRange } from 'react-day-picker';
import { DataPoint } from '../types/DataPoint';

export function groupPurchasesByDate(items: PurchaseItem[], dateRange: DateRange): DataPoint[] {
  if (!dateRange.to) dateRange.to = dateRange.from;

  // Создаем копии дат, чтобы не изменять оригиналы
  const fromDate = new Date(dateRange.from!);
  const toDate = new Date(dateRange.to!);

  // Устанавливаем время на 00:00:00 для корректного сравнения дат
  fromDate.setHours(12, 0, 0, 0);
  toDate.setHours(23, 59, 59, 59);

  // Создаем массив для хранения результата
  const result: DataPoint[] = [];

  // Создаем объект для группировки расходов по датам
  const expensesByDate: Record<string, number> = {};

  // Инициализируем все даты в диапазоне с нулевыми расходами
  const currentDate = new Date(fromDate);
  while (currentDate <= toDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    expensesByDate[dateString] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Группируем расходы по датам
  items.forEach((item) => {
    const itemDate = new Date(item.created_at);
    itemDate.setHours(14, 0, 0, 0);
    const dateString = itemDate.toISOString().split('T')[0];

    // Проверяем, что дата покупки находится в заданном диапазоне
    if (itemDate >= fromDate && itemDate <= toDate) {
      if (expensesByDate[dateString] !== undefined) {
        expensesByDate[dateString] += item.sum;
      } else {
        expensesByDate[dateString] = item.sum;
      }
    }
  });

  // Преобразуем объект в массив DataPoint
  for (const date in expensesByDate) {
    result.push({
      date,
      Расходы: expensesByDate[date],
    });
  }

  // Сортируем результат по дате
  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return result;
}

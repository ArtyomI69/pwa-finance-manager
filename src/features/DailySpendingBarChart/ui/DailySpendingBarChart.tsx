// 'use client';

// Requires third-pary library 'react-countup' for counting animation
// npm install react-countup
import React, { useEffect } from 'react';
import CountUp from 'react-countup';

import { BarChart } from '@/shared/components/tremor/ui/BarChart';
import { Card } from '@/shared/components/tremor/ui/Card';
import { PurchaseItem } from '@/shared/types/shopGroup';

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + '₽';
};

type DataPoint = {
  date: string;
  Расходы: number;
};

function groupPurchasesByDate(items: PurchaseItem[]): DataPoint[] {
  const resultMap: Record<string, number> = {};

  items.forEach((item) => {
    const date = item.created_at.split('T')[0]; // Извлекаем только дату без времени
    if (!resultMap[date]) {
      resultMap[date] = 0;
    }
    resultMap[date] += item.sum;
  });

  // Преобразуем объект в массив DataPoint и сортируем по дате
  const result: DataPoint[] = Object.entries(resultMap)
    .map(([date, sum]) => ({
      date,
      Расходы: sum,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return result;
}

const categories: (keyof DataPoint)[] = ['Расходы'];

export function DailySpendingBarChart({ items }: { items: PurchaseItem[] }) {
  const data = groupPurchasesByDate(items);
  const initialAverageValue =
    Math.floor(
      data.reduce((sum, dataPoint) => {
        categories.forEach((category) => {
          sum += dataPoint[category] as number;
        });
        return sum;
      }, 0)
    ) /
    (data.length * categories.length);

  const [values, setValues] = React.useState<{ start: number; end: number }>({
    start: 0,
    end: initialAverageValue,
  });

  useEffect(() => {
    setValues({
      start: 0,
      end: initialAverageValue,
    });
  }, [initialAverageValue]);

  return (
    <Card>
      <h3 className="text-sm text-gray-500 dark:text-gray-500">Средний расход в день</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
        <CountUp start={values.start} end={values.end} duration={0.6} />
        <span>&#8381;</span>
      </p>
      <BarChart
        className="mt-6 hidden h-80 sm:block"
        data={data}
        index="date"
        categories={categories}
        colors={['blue']}
        valueFormatter={valueFormatter}
        yAxisWidth={60}
      />
      <BarChart
        className="mt-6 h-72 sm:hidden"
        data={data}
        index="date"
        categories={categories}
        colors={['blue']}
        valueFormatter={valueFormatter}
        showYAxis={false}
      />
    </Card>
  );
}

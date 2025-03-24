// 'use client';

// Requires third-pary library 'react-countup' for counting animation
// npm install react-countup
import React from 'react';
import CountUp from 'react-countup';

import { BarChart } from '@/shared/components/tremor/ui/BarChart';
import { Card } from '@/shared/components/tremor/ui/Card';

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString() + '₽';
};

type DataPoint = {
  date: string;
  Расходы: number;
};

const data: DataPoint[] = [
  {
    date: 'Jan 23',
    Расходы: 145,
  },
  {
    date: 'Feb 23',
    Расходы: 110,
  },
  {
    date: 'Mar 23',
    Расходы: 149,
  },
  {
    date: 'Apr 23',
    Расходы: 112,
  },
  {
    date: 'May 23',
    Расходы: 138,
  },
  {
    date: 'Jun 23',
    Расходы: 145,
  },
  {
    date: 'Jul 23',
    Расходы: 134,
  },
  {
    date: 'Aug 23',
    Расходы: 110,
  },
  {
    date: 'Sep 23',
    Расходы: 113,
  },
  {
    date: 'Oct 23',
    Расходы: 129,
  },
  {
    date: 'Nov 23',
    Расходы: 101,
  },
  {
    date: 'Dec 23',
    Расходы: 109,
  },
];

const categories: (keyof DataPoint)[] = ['Расходы'];

const initialAverageValue =
  data.reduce((sum, dataPoint) => {
    categories.forEach((category) => {
      sum += dataPoint[category] as number;
    });
    return sum;
  }, 0) /
  (data.length * categories.length);

export function DailySpendingBarChart() {
  const [values] = React.useState<{ start: number; end: number }>({
    start: 0,
    end: initialAverageValue,
  });

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

// 'use client';

import { cn as cx } from '../../utils/cn';

import { Card } from './ui/Card';
import { DonutChart } from './ui/DonutChart';

const currencyFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString() + ' ₽';

type TData = { name: string; amount: number; share: string; color: string }[];

export function CardDonutChart({
  data,
  name,
  title,
}: {
  data: TData;
  name: string;
  title: string;
}) {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">{title}</h3>
        <DonutChart
          className="mx-auto mt-8"
          data={data}
          category="name"
          value="amount"
          showLabel={true}
          valueFormatter={currencyFormatter}
          showTooltip={false}
          colors={['cyan', 'blue', 'emerald', 'violet', 'fuchsia', 'amber', 'pink', 'lime']}
        />
        <p className="mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{name}</span>
          <span>Цена / В процентах</span>
        </p>
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
        >
          {data.map((item) => (
            <li key={item.name} className="relative flex items-center justify-between py-2">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className={cx(item.color, 'size-2.5 shrink-0 rounded-sm')}
                  aria-hidden={true}
                />
                <span className="truncate dark:text-gray-300">{item.name}</span>
              </div>
              <p className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-gray-900 dark:text-gray-50">
                  {currencyFormatter(item.amount)}
                </span>
                <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {item.share}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

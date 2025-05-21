// 'use client';

import { Card } from '@/shared/components/tremor/ui/Card';

export function BanksBalance() {
  return (
    <>
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <dt className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Доходы
          </dt>
          <dd className="mt-2 flex items-baseline space-x-2.5">
            <span className="text-emerald-700 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              +10.450₽
            </span>
          </dd>
        </Card>
        <Card>
          <dt className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Расходы
          </dt>
          <dd className="mt-2 flex items-baseline space-x-2.5">
            <span className="text-red-700 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              10.450₽
            </span>
          </dd>
        </Card>
        <Card>
          <dt className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Баланс
          </dt>
          <dd className="mt-2 flex items-baseline space-x-2.5">
            <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              10.450₽
            </span>
          </dd>
        </Card>
      </dl>
    </>
  );
}

'use client';

import { Button } from '@/shared/components/tremor/ui/Button';
import { Searchbar } from '@/shared/components/tremor/ui/SearchBar';
import { conditions, shop, categories } from '@/entities/DataTable';
import { formatters } from '@/shared/lib/formatters';
import { RiDownloadLine } from '@remixicon/react';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { DataTableFilter } from './DataTableFilter';
import { ViewOptions } from './DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSetFilterValue = useDebouncedCallback((value) => {
    table.getColumn('product')?.setFilterValue(value);
  }, 300);

  const handleSearchChange = (event: any) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSetFilterValue(value);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        {table.getColumn('product')?.getIsVisible() && (
          <Searchbar
            type="search"
            placeholder="Поиск по товару"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
          />
        )}
        {table.getColumn('category')?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn('category')}
            title="Категория"
            options={categories}
            type="checkbox"
          />
        )}
        {table.getColumn('shop')?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn('shop')}
            title="Магазин"
            options={shop}
            type="checkbox"
          />
        )}
        {table.getColumn('price')?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn('price')}
            title="Цена"
            type="number"
            options={conditions}
            formatter={formatters.currency}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500"
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="flex gap-x-2 px-2 py-1.5 text-sm sm:text-xs">
          <RiDownloadLine className="size-4 shrink-0" aria-hidden="true" />
          Export
        </Button>
        <ViewOptions table={table} />
      </div>
    </div>
  );
}

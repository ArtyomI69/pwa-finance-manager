'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@/shared/components/tremor/ui/Checkbox';
import { formatters } from '@/shared/utils/formatters';
import { DataTableColumnHeader } from '@/shared/components/tremor/data-table/DataTableColumnHeader';
import { ConditionFilter } from '@/shared/components/tremor/data-table/DataTableFilter';
import { Usage } from '../model/schema';

const columnHelper = createColumnHelper<Usage>();

export const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
            ? 'indeterminate'
            : false
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
        className="translate-y-0.5"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        className="translate-y-0.5"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      displayName: 'Select',
    },
  }),
  columnHelper.accessor('category', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Категория" />,
    enableSorting: true,
    meta: {
      className: 'text-left',
      displayName: 'Сategory',
    },
    filterFn: 'arrIncludesSome',
  }),
  columnHelper.accessor('price', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Цена" />,
    enableSorting: true,
    meta: {
      className: 'text-right',
      displayName: 'Price',
    },
    cell: ({ getValue }) => {
      return <span className="font-medium">{formatters.currency(getValue())}</span>;
    },
    filterFn: (row, columnId, filterValue: ConditionFilter) => {
      const value = row.getValue(columnId) as number;
      const [min, max] = filterValue.value as [number, number];

      switch (filterValue.condition) {
        case 'is-equal-to':
          return value == min;
        case 'is-between':
          return value >= min && value <= max;
        case 'is-greater-than':
          return value > min;
        case 'is-less-than':
          return value < min;
        default:
          return true;
      }
    },
  }),
  columnHelper.accessor('date', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Дата" />,
    enableSorting: true,
    meta: {
      className: 'tabular-nums text-right',
      displayName: 'Date',
    },
  }),

  columnHelper.accessor('user', {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Пользователь" />,
    enableSorting: true,
    meta: {
      className: 'text-left',
      displayName: 'User',
    },
  }),
] as ColumnDef<Usage>[];

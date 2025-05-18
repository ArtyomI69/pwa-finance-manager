'use client';

import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
  CommandBarValue,
} from '@/shared/components/tremor/ui/CommandBar';
import { RowSelectionState, Table } from '@tanstack/react-table';

type DataTableBulkEditorProps<TData, TItems> = {
  table: Table<TData>;
  rowSelection: RowSelectionState;
  onDelete?: (rows: TItems[]) => void;
};

function DataTableBulkEditor<TData, TItems>({
  table,
  rowSelection,
  onDelete = () => {},
}: DataTableBulkEditorProps<TData, TItems>) {
  const hasSelectedRows = Object.keys(rowSelection).length > 0;
  return (
    <CommandBar open={hasSelectedRows}>
      <CommandBarBar>
        <CommandBarValue>{Object.keys(rowSelection).length} selected</CommandBarValue>
        <CommandBarSeperator />
        <CommandBarSeperator />
        <CommandBarCommand
          label="Delete"
          action={() => {
            onDelete(table.getSelectedRowModel().rows.map((row) => row.original) as any);
          }}
          shortcut={{ shortcut: 'd' }}
        />
        <CommandBarSeperator />
        <CommandBarCommand
          label="Reset"
          action={() => {
            table.resetRowSelection();
          }}
          shortcut={{ shortcut: 'Escape', label: 'esc' }}
          // don't disable this command
        />
      </CommandBarBar>
    </CommandBar>
  );
}

export { DataTableBulkEditor };

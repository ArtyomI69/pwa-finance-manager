import { DataTable } from '@/shared/components/tremor/data-table/DataTable';
import { columns } from '@/entities/DataTable/ui/columns';
import { usage } from '@/entities/DataTable/model/data';

export const ReceiptsDashboardPersonalTable = () => {
  return <DataTable data={usage} columns={columns} />;
};

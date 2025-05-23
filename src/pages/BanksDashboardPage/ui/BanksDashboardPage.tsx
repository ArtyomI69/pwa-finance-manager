import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { FullScreenLoader } from '@/shared/components/ui/FullScreenLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { DateRange } from 'react-day-picker';
import { BanksDashboard } from '@/widgets/BanksDashboard';
import { useGate, useUnit } from 'effector-react';
import {
  $personalTransactions,
  $transactions,
  BankDashboardPageGate,
  fetchTransactionsFx,
  onDateChangeEv,
} from '../model/BankDashboardPage.store';
import { deleteItemsEv } from '@/pages/ReceiptsDashboardPage/model/ReceiptsDashboardPage.store';

export default function BanksDashboardPage() {
  useGate(BankDashboardPageGate);
  const items = useUnit($transactions);
  const personalItems = useUnit($personalTransactions);
  const loading = useUnit(fetchTransactionsFx.pending);

  const onChangeDate = (date: DateRange) => {
    onDateChangeEv(date);
  };

  const onDeletItems = (items: any[]) => {
    deleteItemsEv(items);
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full py-8 flex flex-col gap-4">
      <DatePickerWithRange className="w-fit mx-auto" onChangeDate={onChangeDate} />
      {loading ? (
        <FullScreenLoader />
      ) : (
        <Tabs defaultValue="personal" className="flex flex-col overflow-hidden">
          <TabsList className="grid flex-1 grid-cols-2">
            <TabsTrigger value="personal">Персональное</TabsTrigger>
            <TabsTrigger value="group">Груповое</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="flex-1">
            <BanksDashboard items={personalItems} isPersonal onDelete={onDeletItems} />
          </TabsContent>
          <TabsContent value="group" className="flex-1">
            <BanksDashboard items={items} onDelete={onDeletItems} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

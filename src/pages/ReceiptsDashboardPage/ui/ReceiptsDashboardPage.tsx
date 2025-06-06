import { ReceiptsDashboard } from '@/widgets/ReceiptsDashboard';
import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { DateRange } from 'react-day-picker';
import { useGate, useUnit } from 'effector-react';
import {
  $date,
  $items,
  $personalItems,
  deleteItemsEv,
  fetchItemsFx,
  onDateChangeEv,
  ReceiptsDashboardPageGate,
} from '../model/ReceiptsDashboardPage.store';
import { FullScreenLoader } from '@/shared/components/ui/FullScreenLoader';
import { PurchaseItem } from '@/shared/types/shopGroup';
import { $isOnline } from '@/entities/OnlineStatus';
import { toast } from 'sonner';
import { useEffect } from 'react';

const ReceiptsDashboardPage = () => {
  const isOnline = useUnit($isOnline);

  useEffect(() => {
    if (!isOnline)
      toast.info('Для просмотра информации на данной страницы необходимо интернет соединение');
  }, []);

  useGate(ReceiptsDashboardPageGate);
  const date = useUnit($date);
  const items = useUnit($items);
  const personalItems = useUnit($personalItems);
  const loading = useUnit(fetchItemsFx.pending);

  const onChangeDate = (date: DateRange) => {
    onDateChangeEv(date);
  };

  const onDeletItems = (items: PurchaseItem[]) => {
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
            <TabsTrigger value="group">Групповое</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="flex-1">
            <ReceiptsDashboard
              items={personalItems}
              isPersonal
              onDelete={onDeletItems}
              date={date}
            />
          </TabsContent>
          <TabsContent value="group" className="flex-1">
            <ReceiptsDashboard items={items} onDelete={onDeletItems} date={date} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ReceiptsDashboardPage;

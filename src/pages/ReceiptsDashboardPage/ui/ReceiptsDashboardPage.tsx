import { ReceiptsDashboard } from '@/widgets/ReceiptsDashboard';
import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { DateRange } from 'react-day-picker';
import { useGate, useUnit } from 'effector-react';
import {
  $items,
  $personalItems,
  onDateChangeEv,
  ReceiptsDashboardPageGate,
} from '../model/ReceiptsDashboardPage.store';
import { fetchGroupedProfilesOnMountFx } from '@/widgets/ReceiptsMapDrawer/model/ReceiptsMapDrawer.store';
import { FullScreenLoader } from '@/shared/components/ui/FullScreenLoader';

const ReceiptsDashboardPage = () => {
  useGate(ReceiptsDashboardPageGate);
  const items = useUnit($items);
  const personalItems = useUnit($personalItems);
  const loading = useUnit(fetchGroupedProfilesOnMountFx.pending);

  const onChangeDate = (date: DateRange) => {
    onDateChangeEv(date);
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
            <ReceiptsDashboard items={personalItems} isPersonal />
          </TabsContent>
          <TabsContent value="group" className="flex-1">
            <ReceiptsDashboard items={items} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ReceiptsDashboardPage;

import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { FullScreenLoader } from '@/shared/components/ui/FullScreenLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { DateRange } from 'react-day-picker';
import { BanksDashboard } from '@/widgets/BanksDashboard';

export default function BanksDashboardPage() {
  // useGate(ReceiptsDashboardPageGate);
  const items = [] as any;
  const personalItems = [] as any;
  const loading = false as any;

  const onChangeDate = (date: DateRange) => {
    // onDateChangeEv(date);
  };

  const onDeletItems = (items: any[]) => {
    // deleteItemsEv(items);
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

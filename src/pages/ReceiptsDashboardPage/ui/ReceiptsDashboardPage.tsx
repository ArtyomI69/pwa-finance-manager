import { ReceiptsDashboardPersonal } from '@/feautres/ReceiptsDashboardPersonal';
import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';

const ReceiptsDashboardPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto w-full py-8 flex flex-col gap-4">
      <DatePickerWithRange className="w-fit mx-auto" />
      <Tabs defaultValue="personal" className="flex flex-col overflow-hidden">
        <TabsList className="grid flex-1 grid-cols-2">
          <TabsTrigger value="personal">Персональное</TabsTrigger>
          <TabsTrigger value="group">Груповое</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="flex-1">
          <ReceiptsDashboardPersonal />
        </TabsContent>
        <TabsContent value="group" className="flex-1">
          <div className="bg-blue-300">lol</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReceiptsDashboardPage;

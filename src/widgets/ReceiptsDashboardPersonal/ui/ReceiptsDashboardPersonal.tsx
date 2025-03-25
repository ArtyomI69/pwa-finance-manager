import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Divider } from '@/shared/components/tremor/ui/Divider';
import { CategoriesDonutChart } from '@/features/CategoriesDonutChart';
import { DailySpendingBarChart } from '@/features/DailySpendingBarChart';
import { ReceiptsDashboardPersonalTable } from '@/features/ReceiptsDashboardPersonalTable';
import { SpendingSummaryCard } from '@/features/SpendingSummaryCard';
import { ShopsDonutChart } from '@/features/ShopsDonutChart';

export const ReceiptsDashboardPersonal = () => {
  return (
    <div className="flex-1 flex flex-col gap-6 mb-12">
      <SpendingSummaryCard />
      <DailySpendingBarChart />
      <Tabs defaultValue="categories" className="flex flex-col overflow-hidden">
        <TabsList className="grid flex-1 grid-cols-2 max-w-screen-md w-full mx-auto">
          <TabsTrigger value="categories">Категории</TabsTrigger>
          <TabsTrigger value="shops">Магазины</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="flex-1">
          <CategoriesDonutChart />
        </TabsContent>
        <TabsContent value="shops" className="flex-1">
          <ShopsDonutChart />
        </TabsContent>
      </Tabs>
      <Divider />
      <ReceiptsDashboardPersonalTable />
    </div>
  );
};

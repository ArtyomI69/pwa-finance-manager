import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { CategoriesDonutBar } from '@/widgets/CategoriesDonutBar';
import { DailySpendingBarChart } from '@/widgets/DailySpendingBarChart';
import { ReceiptsDashboardPersonalTable } from '@/widgets/ReceiptsDashboardPersonalTable';
import { SpendingSummaryCard } from '@/widgets/SpendingSummaryCard';

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
          <CategoriesDonutBar />
        </TabsContent>
        <TabsContent value="shops" className="flex-1">
          <div className="bg-blue-300">Магазины</div>
        </TabsContent>
      </Tabs>
      <ReceiptsDashboardPersonalTable />
    </div>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Divider } from '@/shared/components/tremor/ui/Divider';
import { CategoriesDonutChart } from '@/features/CategoriesDonutChart';
import { DailySpendingBarChart } from '@/features/DailySpendingBarChart';
import { SpendingSummaryCard } from '@/features/SpendingSummaryCard';
import { ShopsDonutChart } from '@/features/ShopsDonutChart';
import { ColorActivator } from '@/shared/components/ui/ColorActivator';
import { DataTable } from '@/shared/components/tremor/data-table/DataTable';
import { columns } from './columns';
import { Usage } from '../model/schema';
import { PurchaseItem } from '@/shared/types/shopGroup';

function transformPurchaseItemsToUsage(items: PurchaseItem[]): Usage[] {
  return items.map((item) => ({
    product: item.name,
    category: item.categories.name,
    shop: item.shops.name,
    price: item.sum, // предполагая, что sum - это общая стоимость quantity товаров
    date: item.created_at,
    user: item.profile.name,
  }));
}

export const ReceiptsDashboardPersonal = ({ items }: { items: PurchaseItem[] }) => {
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
      <DataTable data={transformPurchaseItemsToUsage(items)} columns={columns} />
      <ColorActivator />
    </div>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Divider } from '@/shared/components/tremor/ui/Divider';
import { DailySpendingBarChart } from '@/features/DailySpendingBarChart';
import { ColorActivator } from '@/shared/components/ui/ColorActivator';
import { DataTable } from '@/shared/components/tremor/data-table/DataTable';
import { columns } from './columns';
import { Usage } from '../model/schema';
import { PurchaseItem } from '@/shared/types/shopGroup';
import { CardDonutChart } from '@/shared/components/tremor/CardDonutChart';
import { getCategoryStats } from './utils/getCategoryStats';
import { getShopStats } from './utils/getShopStats';
import { getUserStats } from './utils/getUserStats';

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

export const ReceiptsDashboard = ({
  items,
  isPersonal,
}: {
  items: PurchaseItem[];
  isPersonal?: boolean;
}) => {
  return (
    <div className="flex-1 flex flex-col gap-6 mb-12">
      <DailySpendingBarChart items={items} />
      <Tabs defaultValue="categories" className="flex flex-col overflow-hidden">
        <TabsList
          className={`grid flex-1 grid-cols-${!isPersonal ? 3 : 2} max-w-screen-md w-full mx-auto`}
        >
          <TabsTrigger value="categories">Категории</TabsTrigger>
          <TabsTrigger value="shops">Магазины</TabsTrigger>
          {!isPersonal && <TabsTrigger value="users">Пользователи</TabsTrigger>}
        </TabsList>
        <TabsContent value="categories" className="flex-1">
          <CardDonutChart
            data={getCategoryStats(items)}
            name="Категория"
            title="Расходы по категориям"
          />
        </TabsContent>
        <TabsContent value="shops" className="flex-1">
          <CardDonutChart data={getShopStats(items)} name="Магазин" title="Расходы по магазинам" />
        </TabsContent>
        {!isPersonal && (
          <TabsContent value="users" className="flex-1">
            <CardDonutChart
              data={getUserStats(items)}
              name="Пользователь"
              title="Расходы по пользователям"
            />
          </TabsContent>
        )}
      </Tabs>
      <Divider />
      <DataTable data={transformPurchaseItemsToUsage(items)} columns={columns} />
      <ColorActivator />
    </div>
  );
};

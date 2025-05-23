import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Divider } from '@/shared/components/tremor/ui/Divider';
import { ColorActivator } from '@/shared/components/ui/ColorActivator';
import { DataTable } from '@/shared/components/tremor/data-table/DataTable';
import { columns } from './columns';
import { Usage } from '../model/schema';
import { CardDonutChart } from '@/shared/components/tremor/CardDonutChart';
import { getCategoryStats } from './utils/getCategoryStats';
import { getUserStats } from './utils/getUserStats';
import { BanksBalance } from '@/features/BanksBalance';
import { Transaction } from '@/shared/types/transaction';

function transformTransactionsToUsage(transactions: Transaction[]): Usage[] {
  return transactions.map((transaction) => ({
    id: transaction.id,
    category: transaction.category,
    price: transaction.sum, // предполагая, что sum - это общая стоимость quantity товаров
    date: transaction.created_at,
    user: transaction.profile.name,
  }));
}

interface ReceiptsDashboardProps<T> {
  items: Transaction[];
  isPersonal?: boolean;
  onDelete?: (rows: T[]) => void;
}

export const BanksDashboard = <T,>({ items, isPersonal, onDelete }: ReceiptsDashboardProps<T>) => {
  return (
    <div className="flex-1 flex flex-col gap-6 mb-12">
      <BanksBalance income={3000} expense={-1500} />
      <Tabs defaultValue="categories" className="flex flex-col overflow-hidden">
        <TabsList
          className={`grid flex-1 grid-cols-${!isPersonal ? 2 : 1} max-w-screen-md w-full mx-auto`}
        >
          <TabsTrigger value="categories">Категории</TabsTrigger>
          {!isPersonal && <TabsTrigger value="users">Пользователи</TabsTrigger>}
        </TabsList>
        <TabsContent value="categories" className="flex-1">
          <CardDonutChart
            data={getCategoryStats(items)}
            name="Категория"
            title="Расходы по категориям"
          />
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
      <DataTable data={transformTransactionsToUsage(items)} columns={columns} onDelete={onDelete} />
      <ColorActivator />
    </div>
  );
};

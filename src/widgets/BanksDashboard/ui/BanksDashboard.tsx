import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Divider } from '@/shared/components/tremor/ui/Divider';
import { ColorActivator } from '@/shared/components/ui/ColorActivator';
import { DataTable } from '@/shared/components/tremor/data-table/DataTable';
import { columns } from './columns';
import { Usage } from '../model/schema';
import { CardDonutChart } from '@/shared/components/tremor/CardDonutChart';
import { groupExpensesByCategory } from './utils/groupExpensesByCategory';
import { BanksBalance } from '@/features/BanksBalance';
import { Transaction } from '@/shared/types/transaction';
import { calculateTotals } from './utils/calculateTotal';
import { groupIncomeByCategory } from './utils/groupIncomeByCategory';
import { groupIncomeByUser } from './utils/groupIncomeByUser';
import { groupExpensesByUser } from './utils/groupExpensesByUser';

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
  const { totalIncome, totalExpenses } = calculateTotals(items);
  return (
    <div className="flex-1 flex flex-col gap-6 mb-12">
      <BanksBalance income={totalIncome} expense={-totalExpenses} />
      <Tabs defaultValue="expense-categories" className="flex flex-col overflow-hidden">
        <TabsList
          className={`grid flex-1 grid-cols-${!isPersonal ? 4 : 2} max-w-screen-md w-full mx-auto`}
        >
          <TabsTrigger value="expense-categories">Категории по расходам</TabsTrigger>
          <TabsTrigger value="income-categories">Категории по доходам</TabsTrigger>
          {!isPersonal && <TabsTrigger value="expense-users">Пользователи по расходам</TabsTrigger>}
          {!isPersonal && <TabsTrigger value="income-users">Пользователи по доходам</TabsTrigger>}
        </TabsList>
        <TabsContent value="expense-categories" className="flex-1">
          <CardDonutChart
            data={groupExpensesByCategory(items)}
            name="Категория"
            title="Расходы по категориям"
          />
        </TabsContent>
        <TabsContent value="income-categories" className="flex-1">
          <CardDonutChart
            data={groupIncomeByCategory(items)}
            name="Категория"
            title="Расходы по категориям"
          />
        </TabsContent>
        {!isPersonal && (
          <>
            <TabsContent value="expense-users" className="flex-1">
              <CardDonutChart
                data={groupExpensesByUser(items)}
                name="Пользователь"
                title="Расходы по пользователям"
              />
            </TabsContent>
            <TabsContent value="income-users" className="flex-1">
              <CardDonutChart
                data={groupIncomeByUser(items)}
                name="Пользователь"
                title="Расходы по пользователям"
              />
            </TabsContent>
          </>
        )}
      </Tabs>
      <Divider />
      <DataTable data={transformTransactionsToUsage(items)} columns={columns} onDelete={onDelete} />
      <ColorActivator />
    </div>
  );
};

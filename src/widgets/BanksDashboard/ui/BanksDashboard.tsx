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
import { UploadBankStatement } from '@/features/UploadBankStatement';
import pdfToText from 'react-pdftotext';

interface Transaction {
  date: string;
  category: string;
  amount: string;
}

function extractTransactions(text: string): Transaction[] {
  const transactions: Transaction[] = [];

  // Улучшенное регулярное выражение для более точного извлечения данных
  const transactionRegex =
    /(\d{2}\.\d{2}\.\d{4})\s+(?:\d{2}:\d{2}\s+\d+\s+)?([^\n\d]+?)\s+([+-]?\s*\d[\d\s]*,\d{2})(?:\s+|$)/g;

  let match;
  while ((match = transactionRegex.exec(text)) !== null) {
    const date = match[1];
    const category = match[2].trim();
    // Удаляем пробелы в числе (например, "1 764,00" → "1764,00")
    const amount = match[3].replace(/\s+/g, '');

    // Фильтруем некорректные категории (слишком длинные или содержащие даты)
    if (category.length < 50 && !/\d{2}\.\d{2}\.\d{4}/.test(category)) {
      transactions.push({ date, category, amount });
    }
  }

  return transactions;
}

function transformPurchaseItemsToUsage(items: any[]): Usage[] {
  return items.map((item) => ({
    id: item.id,
    product: item.name,
    category: item.categories.name,
    shop: item.shops.name,
    price: item.sum, // предполагая, что sum - это общая стоимость quantity товаров
    date: item.created_at,
    user: item.profile.name,
  }));
}

interface ReceiptsDashboardProps<T> {
  items: any[];
  isPersonal?: boolean;
  onDelete?: (rows: T[]) => void;
}

export const BanksDashboard = <T,>({ items, isPersonal, onDelete }: ReceiptsDashboardProps<T>) => {
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const text = await pdfToText(file);
    const bankStatementText = text.split('Расшифровка операций')[1];
    console.log(bankStatementText);
    console.log(extractTransactions(bankStatementText));
  };

  return (
    <div className="flex-1 flex flex-col gap-6 mb-12">
      <UploadBankStatement id="sberbank-statement" onFileChange={onFileChange} />
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
      <DataTable
        data={transformPurchaseItemsToUsage(items)}
        columns={columns}
        onDelete={onDelete}
      />
      <ColorActivator />
    </div>
  );
};

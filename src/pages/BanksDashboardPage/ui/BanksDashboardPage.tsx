import pdfToText from 'react-pdftotext';
import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { FullScreenLoader } from '@/shared/components/ui/FullScreenLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { DateRange } from 'react-day-picker';
import { BanksDashboard } from '@/widgets/BanksDashboard';

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

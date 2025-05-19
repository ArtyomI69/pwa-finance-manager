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

export default function BanksDashboardPage() {
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
      <input
        tabIndex={-1}
        type="file"
        onChange={onFileChange}
        accept=".pdf"
        className="absolute top-0 left-0 opacity-0"
      />
    </div>
  );
}

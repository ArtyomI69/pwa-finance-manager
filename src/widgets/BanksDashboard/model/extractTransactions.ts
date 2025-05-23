import { Transaction } from '@/shared/types/transaction';

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
    const sum = match[3].replace(/\s+/g, '').replaceAll(',', '.');
    const isMinus = !sum.includes('+');

    // Фильтруем некорректные категории (слишком длинные или содержащие даты)
    if (category.length < 50 && !/\d{2}\.\d{2}\.\d{4}/.test(category)) {
      transactions.push({ created_at: date, category, sum: isMinus ? -sum : +sum });
    }
  }

  return transactions;
}

export interface IRecieptItem {
  name: string;
  sum: number;
  quantity: number;
}

export function extractProductsData(receiptData): IRecieptItem[] {
  // Проверяем, есть ли данные и структура объекта
  if (!receiptData || !receiptData.data || !receiptData.data.json || !receiptData.data.json.items) {
    console.error('Некорректная структура данных чека');
    return [];
  }
  // Извлекаем и преобразуем данные о товарах
  return receiptData.data.json.items.map((item) => ({
    name: item.name,
    sum: item.sum,
    quantity: item.quantity,
  }));
}

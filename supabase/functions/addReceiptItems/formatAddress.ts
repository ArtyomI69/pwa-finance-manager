export function formatAddress(input: string) {
  // Разбиваем строку по запятым и убираем лишние пробелы
  const parts = input.split(',').map((part) => part.trim());

  // Извлекаем город (обычно он после региона, в формате "г Тверь")
  let city = parts.find((part) => part.startsWith('г ')) || '';
  city = city.replace('г ', '').trim();

  // Извлекаем улицу (ищем часть, начинающуюся с "ул ")
  let street = parts.find((part) => part.startsWith('ул ')) || '';
  street = street.replace('ул ', '').trim();

  // Извлекаем дом (ищем часть, начинающуюся с "Дом ")
  let house = parts.find((part) => part.startsWith('Дом ')) || '';
  house = house.replace('Дом ', '').trim();

  // Формируем результат, заменяем пробелы на плюсы
  let result = '';
  if (city) result += city;
  if (street) result += (result ? '+' : '') + street;
  if (house) result += (result ? '+' : '') + house;

  return result;
}

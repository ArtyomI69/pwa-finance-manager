export function formatDateToSupabase(inputDate: string) {
  // Разбиваем строку на части
  const parts = inputDate.split('.');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  // Создаем новую дату в нужном формате (год-месяц-день)
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

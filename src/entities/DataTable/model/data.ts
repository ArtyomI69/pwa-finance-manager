import { Usage } from './schema';

export const categories: { value: string; label: string }[] = [
  {
    value: 'Еда',
    label: 'Еда',
  },
  {
    value: 'Кафе и рестораны',
    label: 'Кафе и рестораны',
  },
  {
    value: 'Техника',
    label: 'Техника',
  },
];

export const shop: { value: string; label: string }[] = [
  {
    value: 'Магнит',
    label: 'Магнит',
  },
  {
    value: 'Пятёрочка',
    label: 'Пятёрочка',
  },
  {
    value: 'Столовая',
    label: 'Столовая',
  },
  {
    value: 'Чижик',
    label: 'Чижик',
  },
  {
    value: 'Ашан',
    label: 'Ашан',
  },
];

export const conditions: { value: string; label: string }[] = [
  {
    value: 'is-equal-to',
    label: 'Равно сумме',
  },
  {
    value: 'is-between',
    label: 'В промежутке между ценой A и B',
  },
  {
    value: 'is-greater-than',
    label: 'Больше чем',
  },
  {
    value: 'is-less-than',
    label: 'Меньше чем',
  },
];

export const users: {
  name: string;
  initials: string;
  email: string;
  role: string;
}[] = [
  {
    name: 'Emma Stone',
    initials: 'ES',
    email: 'a.stone@gmail.com',
    role: 'viewer',
  },
  {
    name: 'Alissia McCalister',
    initials: 'AM',
    email: 'a.stone@gmail.com',
    role: 'viewer',
  },
  {
    name: 'Emily Luisa Bernacle',
    initials: 'EB',
    email: 'e.luis.bernacle@gmail.com',
    role: 'member',
  },
  {
    name: 'Aaron Wave',
    initials: 'AW',
    email: 'a.flow@acme.com',
    role: 'contributor',
  },
  {
    name: 'Thomas Palstein',
    initials: 'TP',
    email: 't.palstein@acme.com',
    role: 'viewer',
  },
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 's.johnson@gmail.com',
    role: 'admin',
  },
  {
    name: 'Megan Katherina Brown',
    initials: 'MB',
    email: 'm.lovelybrown@gmail.com',
    role: 'contributor',
  },
];

export const invitedUsers: {
  initials: string;
  email: string;
  role: string;
  expires: number;
}[] = [
  {
    initials: 'LP',
    email: 'lydia.posh@gmail.com',
    role: 'viewer',
    expires: 12,
  },
  {
    initials: 'AW',
    email: 'awidburg@bluewin.ch',
    role: 'viewer',
    expires: 8,
  },
];

export const usage: Usage[] = [
  {
    product: 'Пицца Маргарита',
    category: 'Кафе и рестораны',
    shop: 'Чижик',
    price: 5422.35,
    date: '23/09/2023 13:00',
    user: 'Иван Иванов',
  },
  {
    product: 'Смартфон Xiaomi Redmi Note 10 Pro',
    category: 'Техника',
    shop: 'Ашан',
    price: 6087.11,
    date: '22/09/2023 10:45',
    user: 'Ольга Смирнова',
  },
  {
    product: 'Лазанья классическая',
    category: 'Кафе и рестораны',
    shop: 'Столовая',
    price: 7234.56,
    date: '17/05/2021 08:32',
    user: 'Алексей Петров',
  },
  {
    product: 'Фрукты (ассорти)',
    category: 'Еда',
    shop: 'Пятёрочка',
    price: 0,
    date: '10/11/2022 15:24',
    user: 'Анна Сидорова',
  },
  {
    product: 'Ноутбук Lenovo IdeaPad 3',
    category: 'Техника',
    shop: 'Магнит',
    price: 8190.77,
    date: '05/06/2023 12:16',
    user: 'Дмитрий Кузнецов',
  },
];

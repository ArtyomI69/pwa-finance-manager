// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
// @ts-ignore
import { createClient } from 'jsr:@supabase/supabase-js@2';

import { corsHeaders } from './cors.ts';
import { getQrrawData } from './getQrrawData.ts';
import { getCoordinates } from './getCoordinates.ts';
import { formatAddress } from './formatAddress.ts';
import { getItemsWithCategories } from './getItemsWithCategories.ts';

console.info('server started');

interface reqPayload {
  qrraw: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  const { qrraw }: reqPayload = await req.json();

  const qrrawData = await getQrrawData(qrraw);
  // const qrrawData = {
  //   items: [
  //     {
  //       name: 'Пакет ПЯТЕРОЧКА 65х40см',
  //       sum: 999,
  //       quantity: 1,
  //     },
  //     {
  //       name: 'Конф.КАРА-КУМ шоколадные 1кг',
  //       sum: 15600,
  //       quantity: 0.208,
  //     },
  //     {
  //       name: 'СТ.МОЛ.Молоко паст.2,5% 900мл',
  //       sum: 7999,
  //       quantity: 1,
  //     },
  //     {
  //       name: '*P.ONE Корм сух.с лос/пш.1,5кг',
  //       sum: 64999,
  //       quantity: 1,
  //     },
  //     {
  //       name: 'COF.Кофе CLASSICO ITALIANO 5х9г',
  //       sum: 19999,
  //       quantity: 1,
  //     },
  //     {
  //       name: '*Игр.из.пер.Пр.Ам Няма/Лед/Пчела',
  //       sum: 0,
  //       quantity: 1,
  //     },
  //   ],
  //   address:
  //     '170027, 69 - Тверская область, г.о. город Тверь, г Тверь,, ул Оснабрюкская, Дом 38а, Помещение 1',
  //   shopName: 'Общество с ограниченной ответственностью "Агроторг" ',
  // };

  const formatedAddress = formatAddress(qrrawData.address);
  const coordinates = await getCoordinates(formatedAddress);

  let { data: categories } = await supabaseClient.from('categories').select('name');

  const itemsWithCategories = await getItemsWithCategories({
    categories: categories.map(({ name }) => name),
    items: qrrawData.items.map(
      ({ name, quantity, sum }) => `{name: "${name}", quantity: ${quantity}, sum: ${sum}}`
    ),
  });

  const result = {
    items: itemsWithCategories,
    address: formatAddress(qrrawData.address).replaceAll('+', ' '),
    shopName: qrrawData.shopName,
    coordinates,
  };

  return new Response(JSON.stringify(result), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
    },
  });
});

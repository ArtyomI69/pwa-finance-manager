// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { setCorsHeaders } from './setCorsHeaders.ts';
import { getQrrawData } from './getQrrawData.ts';
import { getCoordinates } from './getCoordinates.ts';
import { formatAddress } from './formatAddress.ts';
console.info('server started');

interface reqPayload {
  qrraw: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', setCorsHeaders(req));
  }
  const { qrraw }: reqPayload = await req.json();

  // const data = await getQrrawData(qrraw);

  const data = {
    items: [
      {
        name: '*P.ONE Корм в.с.к.д/ст.к/к.к.3кг',
        sum: 119999,
        quantity: 1,
      },
      {
        name: '*Игр.из.пер.Пр.Ам Няма/Лед/Пчела',
        sum: 0,
        quantity: 2,
      },
    ],
    address:
      '170027, 69 - Тверская область, г.о. город Тверь, г Тверь,, ул Оснабрюкская, Дом 38а, Помещение 1',
    shopName: 'Общество с ограниченной ответственностью "Агроторг" ',
  };

  const coordinates = await getCoordinates(formatAddress(data.address));

  return new Response(
    // JSON.stringify(data),
    JSON.stringify({ data, coordinates }),
    setCorsHeaders(req, {
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
  );
});

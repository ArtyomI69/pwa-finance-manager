// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
// @ts-ignore
import { createClient } from 'jsr:@supabase/supabase-js@2';

import { corsHeaders } from './cors.ts';
import { getQrrawData } from './getQrrawData.ts';
import { getCoordinates } from './getCoordinates.ts';
import { formatAddress } from './formatAddress.ts';
import { getItemsWithCategories } from './getItemsWithCategories.ts';
import { formatCoordinatesForDb } from './formatCoordinatesForDb.ts';
import { findCategoryId } from './findCategoryId.ts';

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

  const formatedAddress = formatAddress(qrrawData.address);
  const { address, coordinates } = await getCoordinates(formatedAddress);

  let { data: categories } = await supabaseClient.from('categories').select('*');

  const itemsWithCategories = await getItemsWithCategories({
    categories: categories.map(({ name }) => name),
    items: qrrawData.items.map(
      ({ name, quantity, sum }) => `{name: "${name}", quantity: ${quantity}, sum: ${sum}}`
    ),
  });

  const result = {
    items: itemsWithCategories,
    address,
    shopName: qrrawData.shopName,
    coordinates,
  };

  const { data } = await supabaseClient
    .from('shops')
    .select('id')
    .eq('name', result.shopName)
    .eq('address', result.address)
    .eq('coordinates', formatCoordinatesForDb(coordinates))
    .maybeSingle();
  let shop_id = data?.id ?? null;

  if (!shop_id) {
    const { data } = await supabaseClient
      .from('shops')
      .insert([
        {
          name: result.shopName,
          address: result.address,
          coordinates: formatCoordinatesForDb(coordinates),
        },
      ])
      .select('id');
    shop_id = data[0].id;
  }

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  const profile_id = user.id;
  const { error } = await supabaseClient.from('items').insert(
    result.items.map(({ name, sum, quantity, category }) => ({
      name,
      sum,
      quantity,
      shop_id,
      category_id: findCategoryId(categories, category),
      profile_id,
    }))
  );

  return new Response(JSON.stringify(result, error), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
    },
  });
});

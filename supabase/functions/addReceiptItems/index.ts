// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { setCorsHeaders } from './setCorsHeaders.ts';
import { getQrrawData } from './getQrrawData.ts';
console.info('server started');

interface reqPayload {
  qrraw: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', setCorsHeaders(req));
  }
  const { qrraw }: reqPayload = await req.json();

  const data = await getQrrawData(qrraw);

  return new Response(
    JSON.stringify(data),
    setCorsHeaders(req, {
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
      },
    })
  );
});

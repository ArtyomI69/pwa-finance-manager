export const getGigaToken = async () => {
  const url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    RqUID: '7dadede9-471e-493b-a41a-489294ebca3a',
    Authorization: `Basic ${Deno.env.get('GIGA_API_KEY')}`,
  };
  const body = new URLSearchParams();
  body.append('scope', 'GIGACHAT_API_PERS');

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });
  const data = await response.json();

  return data.access_token as string;
};

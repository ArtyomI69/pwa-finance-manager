import { extractProductsData, IRecieptItem } from './extractProductsData.ts';

export interface IData {
  items: IRecieptItem[];
  address: string;
  shopName: string;
}

export const getQrrawData = async (qrraw: string) => {
  const result: Partial<IData> = {};
  const body = {
    token: Deno.env.get('FNS_API_TOKEN'),
    qrraw,
  };
  const response = await fetch('https://proverkacheka.com/api/v1/check/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  result.items = extractProductsData(data);
  result.address = data.data.json.retailPlaceAddress;
  result.shopName = data.data.json.user;

  return result as IData;
};

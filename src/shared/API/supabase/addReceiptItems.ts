import { createClient } from './client';

export const addReceiptItems = async (qrraw: string) => {
  return await createClient().functions.invoke('addReceiptItems', {
    body: { qrraw },
  });
};

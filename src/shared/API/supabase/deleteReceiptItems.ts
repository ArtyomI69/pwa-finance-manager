import { createClient } from './client';

export const deleteReceiptItems = async (ids: number[]) => {
  return await createClient().from('items').delete().in('id', ids);
};

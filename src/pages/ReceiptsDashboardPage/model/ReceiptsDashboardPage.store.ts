import { deleteReceiptItems } from '@/shared/API/supabase/deleteReceiptItems';
import { getReceiptItems } from '@/shared/API/supabase/getReceiptItems';
import { toastLoading } from '@/shared/lib/toastLoading';
import { PurchaseItem } from '@/shared/types/shopGroup';
import { subDays } from 'date-fns';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { DateRange } from 'react-day-picker';

const ReceiptsDashboardPageGate = createGate();
const onDateChangeEv = createEvent<DateRange>();
const deleteItemsEv = createEvent<PurchaseItem[]>();

const $items = createStore<PurchaseItem[]>([]);
const $personalItems = createStore<PurchaseItem[]>([]);

const fetchItemsFx = createEffect(async () => {
  return await getReceiptItems({ from: subDays(new Date(Date.now()), 7), to: new Date() });
});

const onDateChangeFx = createEffect(async (date: DateRange) => {
  if (!date.to) date.to = date.from;
  return await getReceiptItems(date);
});

const deleteItemsFx = createEffect(async (items: PurchaseItem[]) => {
  await toastLoading(
    deleteReceiptItems,
    items.map((item) => item.id)
  );
});

sample({
  clock: deleteItemsEv,
  target: deleteItemsFx,
});

sample({
  clock: [ReceiptsDashboardPageGate.open, deleteItemsFx.done],
  target: fetchItemsFx,
});

sample({
  clock: fetchItemsFx.doneData,
  target: $items,
});

sample({ clock: onDateChangeEv, target: onDateChangeFx });

sample({
  clock: onDateChangeFx.doneData,
  target: $items,
});

sample({
  clock: $items,
  fn: (items) => items.filter((item) => item.profile.isCurrentUser),
  target: $personalItems,
});

export {
  $items,
  $personalItems,
  fetchItemsFx,
  onDateChangeEv,
  ReceiptsDashboardPageGate,
  deleteItemsEv,
};

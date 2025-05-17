import { getReceiptItems } from '@/shared/API/supabase/getReceiptItems';
import { PurchaseItem } from '@/shared/types/shopGroup';
import { subDays } from 'date-fns';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { DateRange } from 'react-day-picker';

const ReceiptsDashboardPageGate = createGate();
const onDateChangeEv = createEvent<DateRange>();

const $items = createStore<PurchaseItem[]>([]);

const fetchItemsOnMountFx = createEffect(async () => {
  return await getReceiptItems({ from: subDays(new Date(Date.now()), 7), to: new Date() });
});

const onDateChangeFx = createEffect(async (date: DateRange) => {
  if (!date.to) date.to = date.from;
  return await getReceiptItems(date);
});

sample({
  clock: ReceiptsDashboardPageGate.open,
  target: fetchItemsOnMountFx,
});

sample({
  clock: fetchItemsOnMountFx.doneData,
  target: $items,
});

sample({ clock: onDateChangeEv, target: onDateChangeFx });

sample({
  clock: onDateChangeFx.doneData,
  target: $items,
});

export { $items, fetchItemsOnMountFx, onDateChangeEv, ReceiptsDashboardPageGate };

import { createEffect, createEvent, sample } from 'effector';
import { isAllowedQrScanData } from './isAllowedQrScanData';
import { toast } from 'sonner';
import { addReceiptItems } from '@/shared/API/supabase/addReceiptItems';
import { toastLoading } from '@/shared/lib/toastLoading';

const getQrCodeDataEv = createEvent<string>();

const getQrCodeDataFx = createEffect(async (qrraw: string) => {
  console.log(qrraw);

  if (!isAllowedQrScanData(qrraw)) {
    toast.error('QR code содержит данные не правильного формата. Убедитесь что вы сканируете чек');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return;
  }

  const { data, error: qrDataError } = await toastLoading(addReceiptItems, qrraw);

  if (qrDataError) {
    toast.error('Произошла ошибка при получении информации с QR кода');
    console.error(qrDataError);
    return;
  }

  console.log(data);

  await new Promise((resolve) => setTimeout(resolve, 5000));
});

sample({
  clock: getQrCodeDataEv,
  filter: getQrCodeDataFx.pending.map((pending) => !pending),
  target: getQrCodeDataFx,
});

export { getQrCodeDataEv };

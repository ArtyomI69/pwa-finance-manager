import { createEffect, createEvent, sample } from 'effector';
import { isAllowedQrScanData } from './isAllowedQrScanData';
import { toast } from 'sonner';
import { addReceiptItems } from '@/shared/API/supabase/addReceiptItems';
import { toastLoading } from '@/shared/lib/toastLoading';
import { createGate } from 'effector-react';

const QrScannerGate = createGate();

const getQrCodeDataEv = createEvent<string>();

const getQrCodeDataFx = createEffect(async (qrraw: string) => {
  console.log(qrraw);

  if (!isAllowedQrScanData(qrraw)) {
    toast.error('QR code содержит данные не правильного формата. Убедитесь что вы сканируете чек');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return;
  }

  if (navigator.onLine) {
    const { data, error: qrDataError } = await toastLoading(addReceiptItems, qrraw);

    if (qrDataError) {
      toast.error('Произошла ошибка при получении информации с QR кода');
      console.error(qrDataError);
      return;
    }

    toast.success('Данные из чека успешно добавлены');
    console.log(data);
  } else {
    localStorage.setItem('qrraw', qrraw);
    toast.success('Чек сохранён и будет добавлен как появится интернет соединение');
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
});

const getQrCodeDataFromSavedFx = createEffect(async () => {
  if (!navigator.onLine) return;

  const qrraw = localStorage.getItem('qrraw');
  localStorage.removeItem('qrraw');

  console.log(qrraw);

  if (!qrraw) return;

  if (!isAllowedQrScanData(qrraw)) {
    toast.error(
      'QR code, загруженный при отсутствии интернета, содержит данные не правильного формата.'
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return;
  }

  const { data, error: qrDataError } = await toastLoading(addReceiptItems, qrraw);

  if (qrDataError) {
    toast.error('Произошла ошибка при получении информации с QR кода');
    console.error(qrDataError);
    return;
  }

  toast.success('Данные из чека, загруженного при отсутствии интернета, успешно добавлены');
  console.log(data);
});

sample({
  clock: QrScannerGate.open,
  target: getQrCodeDataFromSavedFx,
});

sample({
  clock: getQrCodeDataEv,
  filter: getQrCodeDataFx.pending.map((pending) => !pending),
  target: getQrCodeDataFx,
});

export { getQrCodeDataEv, QrScannerGate };

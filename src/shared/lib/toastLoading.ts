import { toast } from 'sonner';

export const toastLoading = async <T extends any[], R>(
  cb: (...args: T) => R,
  ...args: T
): Promise<Awaited<R>> => {
  const loadingId = 'loading';
  toast.loading('Загрузка...', { id: loadingId });

  try {
    const result = await cb(...args);
    return result;
  } finally {
    toast.dismiss(loadingId);
  }
};

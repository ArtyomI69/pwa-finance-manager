import { YMaps } from '@pbe/react-yandex-maps';
import { ReceiptsMapDrawer } from '@/widgets/ReceiptsMapDrawer';
import { ReceiptsMap } from '@/features/ReceiptsMap';
import { useUnit } from 'effector-react';
import { $isOnline } from '@/entities/OnlineStatus';
import { toast } from 'sonner';
import { useEffect } from 'react';

const ReceiptsMapPage = () => {
  const isOnline = useUnit($isOnline);

  useEffect(() => {
    if (!isOnline)
      toast.info('Для просмотра информации на данной страницы необходимо интернет соединение');
  }, []);

  return (
    <YMaps query={{ apikey: 'da69f6d8-f14f-4c6a-a65a-8093a117cfef' }}>
      <ReceiptsMapDrawer />
      <ReceiptsMap />
    </YMaps>
  );
};

export default ReceiptsMapPage;

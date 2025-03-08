import { YMaps } from '@pbe/react-yandex-maps';
import { ReceiptsMapDrawer } from '@/widgets/ReceiptsMapDrawer';
import { ReceiptsMap } from '@/feautres/ReceiptsMap';

const ReceiptsMapPage = () => {
  return (
    <YMaps
    // query={{ apikey: 'da69f6d8-f14f-4c6a-a65a-8093a117cfef' }}
    >
      <ReceiptsMapDrawer />
      <ReceiptsMap />
    </YMaps>
  );
};

export default ReceiptsMapPage;

import { Map, ChartBarDecreasing } from 'lucide-react';

import { BentoCard } from '@/shared/components/magicui/bento-grid';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useGate } from 'effector-react';
import { QrScannerGate } from '@/widgets/QrScanner';

const features = [
  {
    Icon: Map,
    name: 'Карта',
    description: 'Узнайте, где вы делаете покупки — посмотрите на карте!',
    href: RoutePath.receipts_map,
    cta: 'Открыть карту',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'flex-1',
  },
  {
    Icon: ChartBarDecreasing,
    name: 'Дашборд',
    description:
      'Узнайте, на что уходит больше всего ваших денег с помощью ярких графиков и таблиц!',
    href: RoutePath.receipts_dashboard,
    cta: 'Открыть статистку',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'flex-1',
  },
];

function ReceiptsPage() {
  useGate(QrScannerGate);
  return (
    <div className="flex-1 flex flex-col gap-4 px-4 py-8 md:py-20">
      {features.map((feature) => (
        <Link key={feature.name} to={feature.href} className={'flex flex-1'}>
          <BentoCard key={feature.name} {...feature} />
        </Link>
      ))}
    </div>
  );
}

export default ReceiptsPage;

import { Card } from '@/shared/components/tremor/ui/Card';
import { PurchaseItem } from '@/shared/types/shopGroup';

export const SpendingSummaryCard = ({ items }: { items: PurchaseItem[] }) => {
  const totalSum = items.reduce((total, item) => total + item.sum, 0);

  return (
    <Card className="max-w-screen-sm mx-auto flex justify-between items-center">
      <div>
        Расходы за выбранный период:
        <br />
        <span className="text-gray-500 text-sm">Все категории</span>
      </div>
      <span className="text-red-500 font-bold">{totalSum.toLocaleString('de-DE')} &#8381;</span>
    </Card>
  );
};

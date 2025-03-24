import { Card } from '@/shared/components/ui/Card';

export const SpendingSummaryCard = () => {
  return (
    <Card className="max-w-screen-sm mx-auto flex justify-between items-center">
      <div>
        Расходы за выбранный период:
        <br />
        <span className="text-gray-500 text-sm">Все категории</span>
      </div>
      <span className="text-red-500 font-bold">1.000.000 &#8381;</span>
    </Card>
  );
};

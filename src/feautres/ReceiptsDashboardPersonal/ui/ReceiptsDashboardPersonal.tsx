import { DailySpendingBarChart } from '@/widgets/DailySpendingBarChart';
import { SpendingSummaryCard } from '@/widgets/SpendingSummaryCard';

export const ReceiptsDashboardPersonal = () => {
  return (
    <div className="flex-1 flex flex-col gap-6 mb-12">
      <SpendingSummaryCard />
      <DailySpendingBarChart />
    </div>
  );
};

import { Label } from '@/shared/components/shadcnui/ui/label';
import { GroupedShop } from '@/shared/types/shopGroup';

export const ReceiptsPersonalDrawerList = ({ groupedShops }: { groupedShops: GroupedShop[] }) => {
  return (
    <ul className="flex flex-col">
      {groupedShops.map((grouped) => (
        <li
          key={`${grouped.shop.name} ${grouped.shop.address}`}
          className="flex items-center justify-between space-y-0 rounded-md border p-4 gap-2"
        >
          <Label>{grouped.shop.name}</Label>
          <p>|</p>
          <Label>{grouped.shop.address}</Label>
          <p>|</p>
          <Label>{grouped.totalSum}₽</Label>
        </li>
      ))}
    </ul>
  );
};

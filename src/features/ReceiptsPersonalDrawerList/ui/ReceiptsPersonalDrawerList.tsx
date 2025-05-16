import { Label } from '@/shared/components/shadcnui/ui/label';
import { GroupedShop } from '@/shared/types/shopGroup';

export const ReceiptsPersonalDrawerList = ({
  groupedShops,
  onItemClick,
}: {
  groupedShops: GroupedShop[];
  onItemClick: (center: number[]) => void;
}) => {
  return (
    <ul className="flex flex-col">
      {groupedShops.map((grouped) => (
        <li
          key={`${grouped.shop.name} ${grouped.shop.address}`}
          className="flex flex-1 w-fit items-center justify-between space-y-0 rounded-md border p-4 gap-2 cursor-pointer"
          onClick={() => onItemClick(grouped.shop.coordinates.split(',').map((el) => +el))}
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

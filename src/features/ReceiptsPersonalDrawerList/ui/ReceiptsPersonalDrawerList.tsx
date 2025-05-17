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
      {groupedShops.map((grouped) => {
        const onClick = () => {
          onItemClick(grouped.shop.coordinates.split(',').map((el) => +el));
        };

        return (
          <li
            key={`${grouped.shop.name} ${grouped.shop.address}`}
            className="flex flex-1 w-fit items-center justify-between space-y-0 rounded-md border p-4 gap-2 cursor-pointer"
            onClick={onClick}
          >
            <Label className="cursor-pointer">{grouped.shop.name}</Label>
            <p>|</p>
            <Label className="cursor-pointer">{grouped.shop.address}</Label>
            <p>|</p>
            <Label className="cursor-pointer text-red-600">{grouped.totalSum}₽</Label>
          </li>
        );
      })}
    </ul>
  );
};

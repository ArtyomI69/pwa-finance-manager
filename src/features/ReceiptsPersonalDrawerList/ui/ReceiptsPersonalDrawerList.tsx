import { Label } from '@/shared/components/shadcnui/ui/label';
import { useGate, useUnit } from 'effector-react';
import { $shops, ReceiptsPersonalDrawerListGate } from '../model/ReceiptsPersonalDrawerList.store';

export const ReceiptsPersonalDrawerList = () => {
  useGate(ReceiptsPersonalDrawerListGate);
  const shops = useUnit($shops);

  return (
    <ul className="flex flex-col">
      {shops.map(({ shopName, address, totalSum }) => (
        <li
          key={shopName}
          className="flex items-center justify-between space-y-0 rounded-md border p-4 gap-4"
        >
          <Label>{shopName}</Label>
          <Label>{address}</Label>
          <Label>{totalSum}₽</Label>
        </li>
      ))}
    </ul>
  );
};

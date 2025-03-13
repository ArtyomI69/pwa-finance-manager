import { useState } from 'react';
import { MenuIcon } from '@/shared/assets/icons/menu-icon';
import { Button } from '@/shared/components/bucketsui/button';
import { Drawer } from '@/shared/components/bucketsui/drawer';
import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { Label } from '@/shared/components/shadcnui/ui/label';
import { Switch } from '@/shared/components/shadcnui/ui/switch';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { Checkbox } from '@/shared/components/shadcnui/ui/checkbox';

export const ReceiptsMapDrawer = () => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>();

  const showDrawer = () => {
    setIsDrawerOpen(undefined);
  };

  const hideDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer
      modal={isMobile ? undefined : false}
      open={isMobile ? isDrawerOpen : true}
      onOpenChange={isMobile ? showDrawer : undefined}
      position="left"
      trigger={
        <Button appearance="text" className="w-12 h-12 md:w-10 md:h-10">
          <MenuIcon className="w-7 h-7 sm:w-5 sm:h-5 shrink-0" />
        </Button>
      }
    >
      <div className="flex flex-col gap-4 py-8 px-4 w-full">
        <h3 className="font-blink-title font-bold text-xl italic">Настройка макеров на карте</h3>
        <DatePickerWithRange />
        <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
          <Switch id="show-label-on-map" />
          <Label htmlFor="show-label-on-map">Отображать названия маркеров</Label>
        </div>
        <Tabs defaultValue="personal" className="w-full flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Персональное</TabsTrigger>
            <TabsTrigger value="group">Груповое</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="group" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
              <li className="flex items-center justify-between space-y-0 rounded-md border p-4">
                <div className="rounded-[50%] bg-red-500 w-4 h-4" />
                <Label htmlFor="name1">Магнит</Label>
                <Checkbox id="name1" />
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </Drawer>
  );
};

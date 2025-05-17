import { useState } from 'react';
import { MenuIcon } from '@/shared/assets/icons/menu-icon';
import { Button } from '@/shared/components/bucketsui/button';
import { Drawer } from '@/shared/components/bucketsui/drawer';
import { DatePickerWithRange } from '@/shared/components/shadcnui/data-range-picker';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/shadcnui/ui/tabs';
import { ReceiptsPersonalDrawerList } from '@/features/ReceiptsPersonalDrawerList';
import { ReceiptsGroupDrawerList } from '@/features/ReceiptsGroupDrawerList';
import { useGate, useUnit } from 'effector-react';
import {
  $currentUserShops,
  $groupedProfiles,
  fetchGroupedProfilesOnMountFx,
  onDateChangeEv,
  openGroupTabEv,
  openPersonalTabEv,
  ReceiptsMapDrawerGate,
} from '../model/ReceiptsMapDrawer.store';
import { setCenterMapEv, setZoomMapEv } from '@/features/ReceiptsMap';
import ThreeDotSimpleLoader from '@/shared/components/cuicui/ThreeDotSimpleLoader';
import { DateRange } from 'react-day-picker';

export const ReceiptsMapDrawer = () => {
  useGate(ReceiptsMapDrawerGate);
  const groupedProfiles = useUnit($groupedProfiles);
  const currentUserShops = useUnit($currentUserShops);
  const loading = useUnit(fetchGroupedProfilesOnMountFx.pending);

  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean | undefined>();

  const showDrawer = () => {
    setIsDrawerOpen(undefined);
  };

  const hideDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onOpenPersonalTab = () => {
    openPersonalTabEv();
  };

  const onOpenGroupTab = () => {
    openGroupTabEv();
  };

  const onItemClick = (center: number[]) => {
    setCenterMapEv(center);
    setZoomMapEv();
    hideDrawer();
  };

  const onChangeDate = (date: DateRange) => {
    onDateChangeEv(date);
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
        <h3 className="font-blink-title font-bold text-xl italic">Отображаемые маркеры на карте</h3>
        <DatePickerWithRange onChangeDate={onChangeDate} />
        <Tabs defaultValue="personal" className="w-full flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal" onClick={onOpenPersonalTab}>
              Персональное
            </TabsTrigger>
            <TabsTrigger value="group" onClick={onOpenGroupTab}>
              Груповое
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="flex-1 overflow-y-scroll">
            {loading ? (
              <ThreeDotSimpleLoader />
            ) : (
              <ReceiptsPersonalDrawerList
                groupedShops={currentUserShops}
                onItemClick={onItemClick}
              />
            )}
          </TabsContent>
          <TabsContent value="group" className="flex-1 overflow-y-scroll">
            {loading ? (
              <ThreeDotSimpleLoader />
            ) : (
              <ReceiptsGroupDrawerList
                groupedProfiles={groupedProfiles}
                onItemClick={onItemClick}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Drawer>
  );
};

import { MenuIcon } from '@/shared/assets/icons/menu-icon';
import { Button } from '@/shared/components/bucketsui/button';
import { Drawer } from '@/shared/components/bucketsui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useState } from 'react';

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
      <div className="flex flex-col gap-2 p-8 w-full">
        <h3 className="font-blink-title text-3xl italic">Настройка карты</h3>
      </div>
    </Drawer>
  );
};

import { useIsMobile } from '@/shared/hooks/use-mobile';
import { AppleStyleDock } from '@/widgets/AppleStyleDock/AppleStyleDock';
import { BottomNavigation } from '@/widgets/BottomNavigation/BottomNavigation';

import { ReceiptRussianRuble, ChartColumnIncreasing, ScanQrCode, Users, Bell } from 'lucide-react';
import { NavItem } from '../types/NavItem';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

export const Navigation = () => {
  const isMobile = useIsMobile();

  const navItems: NavItem[] = [
    {
      title: 'Чеки',
      icon: <ReceiptRussianRuble className="h-full w-full" />,
      href: RoutePath.receipts,
    },
    {
      title: 'Дашборд',
      icon: <ChartColumnIncreasing className="h-full w-full" />,
      href: RoutePath.dashboard,
    },
    {
      title: 'QR сканирование',
      icon: <ScanQrCode className="h-full w-full" />,
      href: RoutePath.qr_scanner,
    },
    {
      title: 'Напомнить',
      icon: <Bell className="h-full w-full" />,
      href: RoutePath.reminders,
    },
    {
      title: 'Группы',
      icon: <Users className="h-full w-full" />,
      href: RoutePath.groups,
    },
  ];

  if (isMobile) {
    return <BottomNavigation navItems={navItems} />;
  }

  return <AppleStyleDock navItems={navItems} />;
};

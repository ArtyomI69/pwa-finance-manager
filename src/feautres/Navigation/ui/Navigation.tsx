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
      icon: <ReceiptRussianRuble />,
      href: RoutePath.receipts,
    },
    {
      title: 'Дашборд',
      icon: <ChartColumnIncreasing />,
      href: RoutePath.dashboard,
    },
    {
      title: 'QR сканирование',
      icon: <ScanQrCode />,
      href: RoutePath.qr_scanner,
    },
    {
      title: 'Напоминания',
      icon: <Bell />,
      href: RoutePath.reminders,
    },
    {
      title: 'Группы',
      icon: <Users />,
      href: RoutePath.groups,
    },
  ];

  if (isMobile) {
    return <BottomNavigation navItems={navItems} />;
  }

  return <AppleStyleDock navItems={navItems} />;
};

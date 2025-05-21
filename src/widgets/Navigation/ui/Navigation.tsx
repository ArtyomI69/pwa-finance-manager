import { useIsMobile } from '@/shared/hooks/use-mobile';
import { AppleStyleDock } from '@/features/AppleStyleDock/AppleStyleDock';
import { BottomNavigation } from '@/features/BottomNavigation/BottomNavigation';

import { ReceiptRussianRuble, ChartColumnIncreasing, ScanQrCode, Users, User } from 'lucide-react';
import { NavItem } from '../types/NavItem';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

export const Navigation = () => {
  const isMobile = useIsMobile();

  const navItems: NavItem[] = [
    {
      title: 'Анализ чеков',
      icon: <ReceiptRussianRuble />,
      href: RoutePath.receipts,
    },
    {
      title: 'Анализ cчетов(банк)',
      icon: <ChartColumnIncreasing />,
      href: RoutePath.banksDashboard,
    },
    {
      title: 'QR сканирование',
      icon: <ScanQrCode />,
      href: RoutePath.qr_scanner,
    },
    {
      title: 'Группы',
      icon: <Users />,
      href: RoutePath.groups,
    },
    {
      title: 'Профиль',
      icon: <User />,
      href: RoutePath.profile,
    },
  ];

  if (isMobile) {
    return <BottomNavigation navItems={navItems} />;
  }

  return <AppleStyleDock navItems={navItems} />;
};

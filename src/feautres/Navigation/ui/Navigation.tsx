import { useIsMobile } from '@/shared/hooks/use-mobile';
import { AppleStyleDock } from '@/widgets/AppleStyleDock/AppleStyleDock';
import { BottomNavigation } from '@/widgets/BottomNavigation/BottomNavigation';

import { ReceiptRussianRuble, ChartColumnIncreasing, ScanQrCode, Users, Bell } from 'lucide-react';
import { NavItem } from '../types/NavItem';

export const Navigation = () => {
  const isMobile = useIsMobile();

  const navItems: NavItem[] = [
    {
      title: 'Чеки',
      icon: <ReceiptRussianRuble className="h-full w-full" />,
      href: '#',
    },
    {
      title: 'Дашборд',
      icon: <ChartColumnIncreasing className="h-full w-full" />,
      href: '#',
    },
    {
      title: 'QR сканирование',
      icon: <ScanQrCode className="h-full w-full" />,
      href: '#',
    },
    {
      title: 'Группы',
      icon: <Users className="h-full w-full" />,
      href: '#',
    },
    {
      title: 'Напомнить',
      icon: <Bell className="h-full w-full" />,
      href: '#',
    },
  ];

  if (isMobile) {
    return <BottomNavigation navItems={navItems} />;
  }

  return <AppleStyleDock navItems={navItems} />;
};

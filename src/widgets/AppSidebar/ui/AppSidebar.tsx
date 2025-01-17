import { ReceiptRussianRuble, ChartColumnIncreasing, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { ModeToggle } from '@/feautres/ModeToggle';

// Menu items.
const items = [
  {
    title: 'Чеки',
    url: '#',
    icon: ReceiptRussianRuble,
  },
  {
    title: 'Дашборд',
    url: '#',
    icon: ChartColumnIncreasing,
  },
  {
    title: 'Группа',
    url: '#',
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>Logo + name</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <p>User avatar + exit</p>
      </SidebarFooter>
    </Sidebar>
  );
}

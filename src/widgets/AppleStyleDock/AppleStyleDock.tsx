import { NavItem } from '@/feautres/Navigation';
import { Dock, DockIcon, DockItem, DockLabel } from '../../shared/ui/dock';
import { Link } from 'react-router-dom';

export function AppleStyleDock({ navItems }: { navItems: NavItem[] }) {
  return (
    <div className="fixed bottom-2 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3">
        {navItems.map((item) => (
          <Link to={item.href} key={item.title}>
            <DockItem className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800">
              <DockLabel>{item.title}</DockLabel>
              <DockIcon className="text-neutral-600 dark:text-neutral-300">{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}

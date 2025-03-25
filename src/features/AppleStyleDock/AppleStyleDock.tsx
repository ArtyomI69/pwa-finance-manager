import { NavItem } from '@/widgets/Navigation';
import { Dock, DockIcon, DockItem, DockLabel } from '../../shared/components/magicui/ui/dock';
import { NavLink } from 'react-router-dom';

export function AppleStyleDock({ navItems }: { navItems: NavItem[] }) {
  return (
    <div className="fixed z-50 bottom-2 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3">
        {navItems.map((item) => (
          <NavLink to={item.href} key={item.title}>
            {({ isActive }) => (
              <DockItem
                className={`aspect-square rounded-full ${
                  isActive ? 'bg-gray-400 dark:bg-neutral-600' : 'bg-gray-200 dark:bg-neutral-800'
                }`}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon
                  className={`${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-500'
                      : 'text-neutral-700 dark:text-neutral-300'
                  } h-full w-full`}
                >
                  {item.icon}
                </DockIcon>
              </DockItem>
            )}
          </NavLink>
        ))}
      </Dock>
    </div>
  );
}

import { NavItem } from '@/feautres/Navigation';

export const BottomNavigation = ({ navItems }: { navItems: NavItem[] }) => {
  const firstHalfNavItems = navItems.slice(0, navItems.length / 2);
  const middleNavItem = navItems[Math.floor(navItems.length / 2)];
  const secondHalfNavItems = navItems.slice(navItems.length / 2 + 1);

  const renderNavItem = ({ title, href, icon }: NavItem) => {
    return (
      <button
        key={title}
        type="button"
        className="inline-flex flex-col items-center justify-center px-5 text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        {icon}
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
          {title}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {firstHalfNavItems.map(renderNavItem)}
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="inline-flex items-center justify-center w-14 h-14 p-3 font-medium text-white bg-green-600 rounded-full hover:bg-green-700 group focus:ring-4 focus:ring-green-300 focus:outline-none dark:focus:ring-green-800"
          >
            {middleNavItem.icon}
          </button>
        </div>
        {secondHalfNavItems.map(renderNavItem)}
      </div>
    </div>
  );
};

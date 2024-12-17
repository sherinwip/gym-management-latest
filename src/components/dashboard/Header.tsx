import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/auth';
import { useSidebarStore } from '../../store/sidebar';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button 
        type="button" 
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3" />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button
            variant="ghost"
            className="relative p-2"
            aria-label="View notifications"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
          </Button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="relative">
              <button
                type="button"
                className="-m-1.5 flex items-center p-1.5"
                id="user-menu-button"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                  alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                    {user?.name || 'Guest'}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import {
  Home,
  Users2,
  Settings,
  Menu,
  ChevronLeft,
  Users,
  LogOut
} from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '~/components/ui/tooltip';
import { Link } from 'react-router';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Mentors', href: '/mentors', icon: Users2 },
  { name: 'Mentees', href: '/mentees', icon: Users }
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logout', href: '/', icon: LogOut }
];

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavItem = ({
    item,
    isBottom = false
  }: {
    item: any;
    isBottom?: boolean;
  }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={''}
          className={cn(
            'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
            true
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground',
            isCollapsed && 'justify-center px-2'
          )}
        >
          <item.icon className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
          {!isCollapsed && <span>{item.name}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div
        className={cn(
          'fixed inset-y-0 z-20 flex flex-col bg-background transition-all duration-300 ease-in-out lg:static',
          isCollapsed ? 'w-[72px]' : 'w-72',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="border-b border-border">
          <div
            className={cn(
              'flex h-16 items-center gap-2 px-4',
              isCollapsed && 'justify-center px-2'
            )}
          >
            {!isCollapsed && (
              <Link to="/" className="flex items-center font-semibold">
                <span className="text-lg">CodeCrafters Labs</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn('ml-auto h-8 w-8', isCollapsed && 'ml-0')}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft
                className={cn(
                  'h-4 w-4 transition-transform',
                  isCollapsed && 'rotate-180'
                )}
              />
              <span className="sr-only">
                {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
              </span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
        <div className="border-t border-border p-2">
          <nav className="space-y-1">
            {bottomNavigation.map((item) => (
              <NavItem key={item.name} item={item} isBottom />
            ))}
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;

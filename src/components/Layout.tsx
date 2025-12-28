import { Outlet } from 'react-router-dom';
import { BottomTabs } from './BottomTabs';
import { FloatingActionButton } from './FloatingActionButton';
import { useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/nomad')) return 'nomad';
    if (path.startsWith('/wallet')) return 'wallet';
    if (path.startsWith('/profile')) return 'profile';
    return 'home';
  };

  // Hide tabs on certain pages
  const hideTabs = location.pathname.startsWith('/admin') || 
                   location.pathname.includes('/proposal') ||
                   location.pathname.includes('/contracts/') ||
                   location.pathname.startsWith('/chat') ||
                   location.pathname.startsWith('/reviews') ||
                   location.pathname.startsWith('/analytics');

  // Show FAB only on main tabs
  const showFAB = !hideTabs && location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Outlet />
      {!hideTabs && <BottomTabs activeTab={getActiveTab()} onTabChange={() => {}} />}
      {showFAB && <FloatingActionButton />}
    </div>
  );
}
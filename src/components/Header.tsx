import { useState } from 'react';
import { Bell, Menu, Search, Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';
import { NotificationPanel } from './NotificationPanel';
import { SearchGlobal } from './SearchGlobal';
import { Logo } from './Logo';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showBack?: boolean;
  showLogo?: boolean;
}

export function Header({ 
  title, 
  showNotifications = true, 
  showMenu = true,
  showSearch = true,
  showBack = false,
  showLogo = false
}: HeaderProps) {
  const navigate = useNavigate();
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { unreadCount } = useNotifications();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            {showBack && (
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}
            {showMenu && !showBack && (
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden">
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}
            {showLogo ? (
              <Logo variant="minimal" size="md" />
            ) : (
              <h1 className="text-gray-900 dark:text-white">{title}</h1>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {showSearch && (
              <button 
                onClick={() => setShowSearchModal(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Search className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}

            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-gray-300" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {showNotifications && (
              <button 
                onClick={() => setShowNotificationPanel(true)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      <NotificationPanel 
        isOpen={showNotificationPanel}
        onClose={() => setShowNotificationPanel(false)}
      />

      <SearchGlobal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </>
  );
}
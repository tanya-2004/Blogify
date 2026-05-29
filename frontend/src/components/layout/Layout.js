import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import { useTheme } from '../../contexts/ThemeContext';
import { NewPostModal } from '../';
import Header from './Header';
import Sidebar from './Sidebar';

const PUBLIC_ROUTES = ['/', '/signin', '/signup'];

function LayoutContent({ children }) {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
  const { isCollapsed } = useSidebar();
  const { fontSize, primaryColor, selectedTheme } = useTheme();

  const fontClass =
    fontSize === 'small' ? 'text-sm'
      : fontSize === 'large' ? 'text-lg'
        : 'text-base';

  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const handlePostCreated = () => {
    setShowNewPostModal(false);
    window.location.reload();
  };

  const themeClasses = `${selectedTheme.bg} ${selectedTheme.text}`;

  if (isPublicRoute) {
    return (
      <div className={`${themeClasses} ${fontClass} min-h-screen`}>
        {children}
      </div>
    );
  }

  if (isAuth) {
    return (
      <div className={`${themeClasses} ${fontClass} min-h-screen`}>
        <Header />
        <div className="flex h-screen">
          <Sidebar onNewPost={handleNewPost} />
          <main
            className={`flex-1 pt-16 transition-all duration-300 overflow-y-auto h-screen ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}
          >
            <div className="p-4 pb-8">
              {children}
            </div>
          </main>
        </div>

        <NewPostModal
          open={showNewPostModal}
          onClose={() => setShowNewPostModal(false)}
          onPostCreated={handlePostCreated}
          accentColor={primaryColor}
        />
      </div>
    );
  }

  return (
    <div className={`${themeClasses} ${fontClass} min-h-screen`}>
      {children}
    </div>
  );
}

function Layout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}

export default Layout;
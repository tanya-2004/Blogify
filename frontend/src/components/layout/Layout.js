import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import { NewPostModal } from '../';
import Header from './Header';
import Sidebar from './Sidebar';

// Routes that should not show the sidebar/authenticated layout
const PUBLIC_ROUTES = ['/', '/signin', '/signup'];

function LayoutContent({ children }) {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
  const { isCollapsed } = useSidebar();
  
  // State for NewPostModal
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  
  const handleNewPost = () => {
    setShowNewPostModal(true);
  };
  
  const handlePostCreated = () => {
    setShowNewPostModal(false);
    // Optionally refresh the page or trigger a refresh of posts
    window.location.reload();
  };
  
  // For public routes (home, signin, signup), don't show sidebar
  if (isPublicRoute) {
    return children;
  }
  
  // For protected routes, show full layout with sidebar
  if (isAuth) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex h-screen">
          <Sidebar onNewPost={handleNewPost} />
          <main 
            className={`flex-1 pt-16 transition-all duration-300 overflow-y-auto h-screen ${
              isCollapsed ? 'md:ml-16' : 'md:ml-64'
            }`}
          >
            <div className="p-4 pb-8">
              {children}
            </div>
          </main>
        </div>
        
        {/* NewPostModal */}
        <NewPostModal
          open={showNewPostModal}
          onClose={() => setShowNewPostModal(false)}
          onPostCreated={handlePostCreated}
        />
      </div>
    );
  }
  
  // If trying to access protected route without auth, this shouldn't happen
  // because ProtectedRoute should redirect, but just in case
  return children;
}

function Layout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}

export default Layout;

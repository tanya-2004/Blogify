import { useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import Header from './Header';
import Sidebar from './Sidebar';

// Routes that should not show the sidebar/authenticated layout
const PUBLIC_ROUTES = ['/', '/signin', '/signup'];

function Layout({ children }) {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
  
  // For public routes (home, signin, signup), don't show sidebar
  if (isPublicRoute) {
    return children;
  }
  
  // For protected routes, show full layout with sidebar
  if (isAuth) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 md:ml-44 pl-2">
            {children}
          </main>
        </div>
      </div>
    );
  }
  
  // If trying to access protected route without auth, this shouldn't happen
  // because ProtectedRoute should redirect, but just in case
  return children;
}

export default Layout;

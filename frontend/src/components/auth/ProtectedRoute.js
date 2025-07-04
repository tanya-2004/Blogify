import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

function ProtectedRoute({ children }) {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to signin with the current location so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  return children;
}

export default ProtectedRoute;

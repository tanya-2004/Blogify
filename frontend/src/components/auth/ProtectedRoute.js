import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

function ProtectedRoute() {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate
      to="/signin"
      state={{ from: location, reason: 'auth-required' }}
      replace
    />
  );
}

export default ProtectedRoute;
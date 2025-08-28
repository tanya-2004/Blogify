import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { isAuthenticated } from '../../utils/auth';

function ProtectedRoute() {
  const location = useLocation();

  // ✅ Memoize auth check to avoid re-parsing token on every render
  const isAuth = useMemo(() => isAuthenticated(), []);

  return isAuth ? (
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
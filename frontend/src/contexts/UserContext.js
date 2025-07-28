import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../utils/axios';
import { showSuccess, showError } from '../utils/toast';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsUserLoading(false);
      return;
    }

    setIsUserLoading(true);
    try {
      const res = await API.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      console.error('[UserContext] Failed to hydrate user', err);
      showError('Unable to load user');
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    showSuccess('You’ve been logged out');
  }, []);

  useEffect(() => {
    const syncLogout = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setUser(null);
        showError('Logged out in another tab');
      }
    };
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, loadUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
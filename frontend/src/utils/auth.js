import { showError } from './toast';

const devLog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[AUTH]', ...args);
  }
};

// 🧠 Token Utilities
export const setToken = (token) => {
  localStorage.setItem('token', token);
  devLog('Token set');
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  devLog('Token retrieved:', token ? 'Found' : 'Not found');
  return token;
};

export const removeToken = () => {
  localStorage.removeItem('token');
  devLog('Token removed');
};

// 🧪 Payload Parser (Centralized)
const parseTokenPayload = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    devLog('Failed to parse token payload:', err);
    return null;
  }
};

// 🧠 Cached payload for reuse
let cachedPayload = null;
const getPayload = () => {
  if (cachedPayload) return cachedPayload;
  const token = getToken();
  cachedPayload = parseTokenPayload(token);
  return cachedPayload;
};

// ✅ Auth Check
let hasShownExpiredToast = false;

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    devLog('No token, unauthenticated');
    return false;
  }

  const payload = getPayload();
  if (!payload) {
    showError('Invalid token. Please sign in again.');
    removeToken();
    devLog('Malformed token, removed');
    return false;
  }

  const isExpired = payload.exp * 1000 < Date.now();
  if (isExpired) {
    if (!hasShownExpiredToast) {
      showError('Your session has expired');
      hasShownExpiredToast = true;
    }
    removeToken();
    devLog('Expired token, removed');
    return false;
  }

  devLog('Valid token, authenticated');
  return true;
};

// 👤 Get user from token
export const getUserFromToken = () => getPayload() || null;

// 🎨 Optional: Theme preference from token
export const getThemeFromToken = () => getPayload()?.theme || 'default';

// 🛠 Dev helper
export const debugAuthStatus = () => {
  if (process.env.NODE_ENV !== 'development') return;

  devLog('=== AUTH DEBUG INFO ===');
  devLog('Token exists:', !!getToken());
  devLog('Token value:', getToken());
  devLog('Is authenticated:', isAuthenticated());
  devLog('User from token:', getUserFromToken());
  devLog('========================');
};
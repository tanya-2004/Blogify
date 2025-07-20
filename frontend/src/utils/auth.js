export const setToken = (token) => {
  console.log('Auth utils - Setting token');
  localStorage.setItem('token', token);
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('Auth utils - Getting token:', token ? 'Found' : 'Not found');
  return token;
};

export const removeToken = () => {
  console.log('Auth utils - Removing token');
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    console.log('Auth utils - No token, user not authenticated');
    return false;
  }
  
  try {
    // Basic check - decode JWT without verification (client-side)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    
    if (isExpired) {
      console.log('Auth utils - Token expired, removing');
      removeToken();
      return false;
    }
    
    console.log('Auth utils - User authenticated, token valid');
    return true;
  } catch (error) {
    console.log('Auth utils - Invalid token format, removing');
    removeToken();
    return false;
  }
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.log('Auth utils - Error decoding token');
    return null;
  }
};

export const debugAuthStatus = () => {
  console.log('=== AUTH DEBUG INFO ===');
  console.log('Token exists:', !!getToken());
  console.log('Token value:', getToken());
  console.log('Is authenticated:', isAuthenticated());
  console.log('User from token:', getUserFromToken());
  console.log('=====================');
};
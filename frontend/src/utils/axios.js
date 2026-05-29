import axios from 'axios';
import { showError } from './toast';
import { getToken, removeToken } from './auth';

const baseURL = process.env.REACT_APP_API_URL;
console.log('[ENV]', process.env.NODE_ENV);
console.log('[API] Base URL:', baseURL);

const API = axios.create({ baseURL });

// 🔐 Request interceptor
API.interceptors.request.use((req) => {
  const token = getToken();
  const method = req.method?.toUpperCase();
  const url = req.url;

  console.log(`[API] → ${method} ${url}`);
  console.log('Token present:', !!token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set');
  }

  return req;
});

// ⚠️ Response interceptor
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    console.error('[API Error]', status, data);

    if (status === 401) {
      showError('Session expired. Please sign in again.');
      removeToken();
      window.location.href = '/signin';
    }

    if ([502, 503].includes(status)) {
      console.warn('[API] Retrying due to transient error:', status);
      await new Promise((r) => setTimeout(r, 1000));
      return API(error.config);
    }

    return Promise.reject(error);
  }
);

// 🛠 Public API export
export const updateUserSettings = (data) => API.patch('/auth/settings', data);

export default API;
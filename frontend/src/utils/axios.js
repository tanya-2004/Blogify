import axios from 'axios';
import { showError } from './toast';
import { getToken, removeToken } from './auth';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// 🛠 Public API export for updating settings
export const updateUserSettings = (data) => API.patch('/auth/settings', data);

// 🔐 Request interceptor: attach token and log
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

// ⚠️ Response interceptor: handle global errors
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    console.error('[API Error]', status, data);

    if (status === 401) {
      showError('Session expired. Please sign in again.');
      removeToken();
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);

export default API;
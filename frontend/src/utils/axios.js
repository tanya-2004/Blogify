import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  console.log('API Request - Token found:', token ? 'Yes' : 'No');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log('API Request - Authorization header set');
  } else {
    console.log('API Request - No token found in localStorage');
  }
  return req;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Response Error:', error.response?.data);
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing token and redirecting to login');
      localStorage.removeItem('token');
      // You might want to redirect to login page here
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
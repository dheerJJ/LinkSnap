import axios from 'axios';
import useAuthStore from '../stores/authStore';

/**
 * Axios instance configured with base URL and auth interceptor.
 * All API calls go through this instance.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 (token expired / unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} createdAt
 */

/**
 * @typedef {Object} LinkItem
 * @property {string} id
 * @property {string} originalUrl
 * @property {string} shortCode
 * @property {string} shortUrl
 * @property {string} [customAlias]
 * @property {boolean} [passwordProtected]
 * @property {string} [expirationDate]
 * @property {number} clicks
 * @property {string} status - 'active' | 'expired'
 * @property {string} createdAt
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {Array<{date: string, clicks: number}>} clicksPerDay
 * @property {Array<{country: string, clicks: number}>} byCountry
 * @property {Array<{browser: string, clicks: number}>} byBrowser
 * @property {Array<{os: string, clicks: number}>} byOS
 * @property {Array<{referrer: string, clicks: number}>} byReferrer
 * @property {Array<{device: string, location: string, referrer: string, timestamp: string}>} recentClicks
 */

const api = {
  // ── Auth ──
  register: (data) => axiosInstance.post('/register', data),
  login: (data) => axiosInstance.post('/login', data),
};

export default api;


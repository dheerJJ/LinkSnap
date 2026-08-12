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
  deleteAccount: () => axiosInstance.delete('/delete-account'),

  // ── QR Code ──
  getQRCodeUrl: (shortId) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    return `${baseURL}/qr/${shortId}`;
  },
  downloadQR: async (shortId, filename) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const res = await axiosInstance.get(`/qr/${shortId}`, { responseType: 'blob' });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `qr-${shortId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // ── Links ──
  createLink: async (data) => {
    const res = await axiosInstance.post('/url', { 
      url: data.originalUrl,
      customAlias: data.customAlias || undefined
    });
    const shortId = res.data.id;
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const shortUrl = `${baseURL}/${shortId}`;

    const newLink = {
      id: shortId,
      shortCode: shortId,
      originalUrl: data.originalUrl,
      shortUrl,
      title: data.title?.trim() || data.customAlias?.trim() || shortId,
      customAlias: data.customAlias || null,
      passwordProtected: !!data.password,
      isProtected: !!data.password,
      expirationDate: data.expirationDate || null,
      expiresAt: data.expirationDate || 'Never',
      clicks: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const email = useAuthStore.getState().user?.email || 'guest';
    const localLinksStr = localStorage.getItem(`linksnap_links_${email}`) || '[]';
    const links = JSON.parse(localLinksStr);
    links.unshift(newLink);
    localStorage.setItem(`linksnap_links_${email}`, JSON.stringify(links));

    return { data: newLink };
  },

  getLinks: async () => {
    const email = useAuthStore.getState().user?.email || 'guest';
    const localLinksStr = localStorage.getItem(`linksnap_links_${email}`) || '[]';
    const links = JSON.parse(localLinksStr);

    const updatedLinks = await Promise.all(
      links.map(async (link) => {
        try {
          const analyticsRes = await axiosInstance.get(`/analytics/${link.id}`);
          const visitHistory = analyticsRes.data.analytics || [];
          return {
            ...link,
            clicks: analyticsRes.data.totalClicks || 0,
            visitHistory,
            status: (link.expirationDate && new Date(link.expirationDate) < new Date()) ? 'expired' : 'active',
          };
        } catch (err) {
          console.error(err);
          return link;
        }
      })
    );

    return { data: updatedLinks };
  },

  getLink: async (id) => {
    const email = useAuthStore.getState().user?.email || 'guest';
    const localLinksStr = localStorage.getItem(`linksnap_links_${email}`) || '[]';
    const links = JSON.parse(localLinksStr);
    const link = links.find((l) => l.id === id);
    if (!link) throw { response: { status: 404, data: { message: 'Link not found' } } };

    try {
      const analyticsRes = await axiosInstance.get(`/analytics/${id}`);
      link.clicks = analyticsRes.data.totalClicks || 0;
      link.visitHistory = analyticsRes.data.analytics || [];
    } catch (err) {
      console.error(err);
    }
    return { data: link };
  },

  updateLink: async (id, data) => {
    const email = useAuthStore.getState().user?.email || 'guest';
    const localLinksStr = localStorage.getItem(`linksnap_links_${email}`) || '[]';
    let links = JSON.parse(localLinksStr);
    const idx = links.findIndex((l) => l.id === id);
    if (idx === -1) throw { response: { status: 404, data: { message: 'Link not found' } } };

    links[idx] = { ...links[idx], ...data };
    localStorage.setItem(`linksnap_links_${email}`, JSON.stringify(links));
    return { data: links[idx] };
  },

  deleteLink: async (id) => {
    const email = useAuthStore.getState().user?.email || 'guest';
    const localLinksStr = localStorage.getItem(`linksnap_links_${email}`) || '[]';
    let links = JSON.parse(localLinksStr);
    links = links.filter((l) => l.id !== id);
    localStorage.setItem(`linksnap_links_${email}`, JSON.stringify(links));
    return { data: { message: 'Link deleted' } };
  },

  getAnalytics: async (id) => {
    const analyticsRes = await axiosInstance.get(`/analytics/${id}`);
    return { data: analyticsRes.data };
  },

  checkAlias: async (alias) => {
    const email = useAuthStore.getState().user?.email || 'guest';
    const localLinksStr = localStorage.getItem(`linksnap_links_${email}`) || '[]';
    const links = JSON.parse(localLinksStr);
    const taken = links.some((l) => l.customAlias === alias);
    return { data: { available: !taken } };
  },
};

export default api;


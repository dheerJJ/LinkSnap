3 /**
 * API service entry point.
 * Conditionally exports mock or real API based on VITE_USE_MOCK env var.
 * Components import from this file — never from api.js or mockApi.js directly.
 */
import realApi from './api';
import mockApi from './mockApi';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

const api = useMock ? mockApi : realApi;

export default api;

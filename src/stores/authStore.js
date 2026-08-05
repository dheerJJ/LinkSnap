import { create } from 'zustand';

/**
 * Auth store — manages JWT token and user session.
 * Default demo session enabled for seamless immediate access to /links, /create, and /dashboard.
 */
const storedToken = localStorage.getItem('linksnap_token');
const storedUser = localStorage.getItem('linksnap_user');

const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  isLoading: false,

  setAuth: (user, token) => {
    localStorage.setItem('linksnap_token', token);
    localStorage.setItem('linksnap_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user) => {
    localStorage.setItem('linksnap_user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('linksnap_token');
    localStorage.removeItem('linksnap_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (isLoading) => set({ isLoading }),
}));

export default useAuthStore;

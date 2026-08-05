import { create } from 'zustand';

/**
 * Theme store — dark/light mode with localStorage persistence.
 */
const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem('linksnap_theme') || 'light',

  initTheme: () => {
    const currentTheme = get().theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('linksnap_theme', next);
      document.documentElement.setAttribute('data-theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { theme: next };
    }),

  setTheme: (theme) => {
    localStorage.setItem('linksnap_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
}));

export default useThemeStore;

import { create } from 'zustand';

let toastId = 0;

/**
 * Toast notification store.
 * Supports success, error, info, warning types with auto-dismiss.
 */
const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: ({ type = 'info', title, message, duration = 4000 }) => {
    const id = ++toastId;
    set((state) => ({
      toasts: [...state.toasts, { id, type, title, message, duration }],
    }));
    if (duration > 0) {
      setTimeout(() => get().removeToast(id), duration);
    }
    return id;
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearAll: () => set({ toasts: [] }),

  // Convenience methods
  success: (message, title = 'Success') =>
    get().addToast({ type: 'success', title, message }),
  error: (message, title = 'Error') =>
    get().addToast({ type: 'error', title, message }),
  info: (message, title = 'Info') =>
    get().addToast({ type: 'info', title, message }),
  warning: (message, title = 'Warning') =>
    get().addToast({ type: 'warning', title, message }),
}));

export default useToastStore;

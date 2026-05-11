import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Auth Store ──────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);

// ── Theme Store ─────────────────────────────────────────────
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
    }),
    { name: 'theme-storage' }
  )
);

// ── Toast Store ─────────────────────────────────────────────
let toastId = 0;
export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

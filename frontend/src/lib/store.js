import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Demo Users (for presentation without a real backend) ────
const DEMO_USERS = [
  { id: 1, name: 'Admin Manager', email: 'admin@demo.com', password: 'Admin@123', role: 'ADMIN' },
  { id: 2, name: 'John Customer', email: 'user@demo.com',  password: 'User@123',  role: 'USER'  },
  { id: 3, name: 'Rahul Seller',  email: 'seller@demo.com',password: 'Seller@123', role: 'SELLER'},
];

// ── Auth Store ──────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // Demo login — matches against hardcoded users
      login: (email, password) => {
        const match = DEMO_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (match) {
          const { password: _, ...safeUser } = match;
          const token = 'demo_jwt_' + btoa(safeUser.email + ':' + Date.now());
          set({ user: safeUser, token, isAuthenticated: true });
          return { success: true, user: safeUser };
        }
        return { success: false, message: 'Invalid email or password.' };
      },
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

// ── Cart Store ───────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          set({ items: items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) });
        } else {
          set({ items: [...items, { ...product, qty: 1 }] });
        }
      },
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'cart-storage' }
  )
);

// ── Wishlist Store ───────────────────────────────────────────
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = get().items;
        const exists = items.find((i) => i.id === product.id);
        set({ items: exists ? items.filter((i) => i.id !== product.id) : [...items, product] });
      },
      has: (id) => get().items.some((i) => i.id === id),
    }),
    { name: 'wishlist-storage' }
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

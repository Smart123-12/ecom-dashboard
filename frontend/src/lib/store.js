import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Demo Users ──────────────────────────────────────────────
const DEMO_USERS = [
  { id: 1, name: 'Admin Manager',  email: 'admin@demo.com',  password: 'Admin@123',  role: 'ADMIN'  },
  { id: 2, name: 'John Customer',  email: 'user@demo.com',   password: 'User@123',   role: 'USER'   },
  { id: 3, name: 'Rahul Seller',   email: 'seller@demo.com', password: 'Seller@123', role: 'SELLER' },
];

// ── Seed Products ────────────────────────────────────────────
export const DEFAULT_PRODUCTS = [
  { id: 1,  name: 'Samsung Galaxy S24 Ultra',   category: 'Mobiles',     price: 1099, original: 1399, stock: 45,   status: 'Active',       sku: 'MOB-001', rating: 4.7, reviews: 23450,  badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',   addedBy: 'admin'  },
  { id: 2,  name: 'Apple AirPods Pro (2nd Gen)', category: 'Electronics', price: 189,  original: 249,  stock: 120,  status: 'Active',       sku: 'ELE-002', rating: 4.9, reviews: 41200,  badge: 'Trending',    img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop',   addedBy: 'admin'  },
  { id: 3,  name: 'Nike Air Max 270',            category: 'Fashion',     price: 150,  original: 199,  stock: 3,    status: 'Low Stock',    sku: 'FAS-003', rating: 4.5, reviews: 8920,   badge: 'New',         img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',   addedBy: 'seller' },
  { id: 4,  name: 'Ergonomic Gaming Chair',      category: 'Furniture',   price: 399,  original: 599,  stock: 18,   status: 'Active',       sku: 'FUR-004', rating: 4.6, reviews: 3120,   badge: 'Hot Deal',    img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=300&h=300&fit=crop',   addedBy: 'admin'  },
  { id: 5,  name: 'Nikon D3500 DSLR Camera',    category: 'Electronics', price: 489,  original: 649,  stock: 0,    status: 'Out of Stock', sku: 'ELE-005', rating: 4.8, reviews: 15670,  badge: 'Popular',     img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',   addedBy: 'admin'  },
  { id: 6,  name: 'Instant Pot Duo 7-in-1',     category: 'Appliances',  price: 79,   original: 129,  stock: 67,   status: 'Active',       sku: 'APP-006', rating: 4.7, reviews: 54800,  badge: 'Deal of Day', img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop',   addedBy: 'seller' },
  { id: 7,  name: "Levi's 511 Slim Fit Jeans",  category: 'Fashion',     price: 39,   original: 69,   stock: 200,  status: 'Active',       sku: 'FAS-007', rating: 4.4, reviews: 12300,  badge: 'Clearance',   img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop',   addedBy: 'seller' },
  { id: 8,  name: 'Mi Smart Band 8',             category: 'Mobiles',     price: 29,   original: 49,   stock: 340,  status: 'Active',       sku: 'MOB-008', rating: 4.6, reviews: 89200,  badge: 'Flash Sale',  img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',   addedBy: 'admin'  },
  { id: 9,  name: 'boAt Rockerz 450',            category: 'Electronics', price: 39,   original: 79,   stock: 500,  status: 'Active',       sku: 'ELE-009', rating: 4.3, reviews: 102000, badge: 'Popular',     img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',   addedBy: 'seller' },
  { id: 10, name: 'Organic Green Tea (100 bags)',category: 'Beauty',      price: 15,   original: 25,   stock: 1200, status: 'Active',       sku: 'BEA-010', rating: 4.5, reviews: 34000,  badge: 'Natural',     img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop',   addedBy: 'admin'  },
];

// ── Seed Orders ──────────────────────────────────────────────
const DEFAULT_ORDERS = [
  { id: '#ORD-5234', customer: 'Aarav Shah',   email: 'aarav@example.com',  product: 'Samsung Galaxy S24 Ultra', amount: 1099, status: 'Delivered',  date: 'May 10, 2024', payment: 'Stripe',   img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=60&h=60&fit=crop' },
  { id: '#ORD-5233', customer: 'Priya Mehta',  email: 'priya@example.com',  product: 'Apple AirPods Pro',        amount: 189,  status: 'Processing', date: 'May 10, 2024', payment: 'Razorpay', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=60&h=60&fit=crop' },
  { id: '#ORD-5232', customer: 'Rohan Patel',  email: 'rohan@example.com',  product: 'Nike Air Max 270',         amount: 150,  status: 'Shipped',    date: 'May 09, 2024', payment: 'PayPal',   img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop' },
  { id: '#ORD-5231', customer: 'Sneha Joshi',  email: 'sneha@example.com',  product: 'Ergonomic Gaming Chair',   amount: 399,  status: 'Pending',    date: 'May 09, 2024', payment: 'Stripe',   img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=60&h=60&fit=crop' },
  { id: '#ORD-5230', customer: 'Karan Desai',  email: 'karan@example.com',  product: 'Nikon D3500 DSLR',         amount: 489,  status: 'Cancelled',  date: 'May 08, 2024', payment: 'PayPal',   img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=60&h=60&fit=crop' },
  { id: '#ORD-5229', customer: 'Meera Shah',   email: 'meera@example.com',  product: 'Instant Pot Duo',          amount: 79,   status: 'Delivered',  date: 'May 07, 2024', payment: 'Stripe',   img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=60&h=60&fit=crop' },
  { id: '#ORD-5228', customer: 'Dev Parmar',   email: 'dev@example.com',    product: "Levi's 511 Slim Jeans",    amount: 39,   status: 'Delivered',  date: 'May 06, 2024', payment: 'Razorpay', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=60&h=60&fit=crop' },
];

// ── Products Store ────────────────────────────────────────────
export const useProductStore = create(
  persist(
    (set) => ({
      products: DEFAULT_PRODUCTS,
      addProduct: (product) => {
        const newP = { ...product, id: Date.now(), rating: 4.5, reviews: 0 };
        set((s) => ({ products: [newP, ...s.products] }));
        return newP;
      },
      updateProduct: (data) => set((s) => ({ products: s.products.map((p) => p.id === data.id ? { ...p, ...data } : p) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      resetProducts: () => set({ products: DEFAULT_PRODUCTS }),
    }),
    { name: 'products-storage' }
  )
);

// ── Orders Store ──────────────────────────────────────────────
export const useOrderStore = create(
  persist(
    (set) => ({
      orders: DEFAULT_ORDERS,
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateStatus: (id, status) => set((s) => ({ orders: s.orders.map((o) => o.id === id ? { ...o, status } : o) })),
      resetOrders: () => set({ orders: DEFAULT_ORDERS }),
    }),
    { name: 'orders-storage' }
  )
);

// ── Auth Store ────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
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

// ── Theme Store ────────────────────────────────────────────────
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
    }),
    { name: 'theme-storage' }
  )
);

// ── Cart Store ─────────────────────────────────────────────────
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
      updateQty: (id, qty) => set((s) => ({ items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => i.id === id ? { ...i, qty } : i) })),
      clearCart: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'cart-storage' }
  )
);

// ── Wishlist Store ─────────────────────────────────────────────
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

// ── Toast Store ────────────────────────────────────────────────
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

import axios from 'axios';

const NODE_API = import.meta.env.VITE_NODE_API_URL || 'http://localhost:5000/api';
const PHP_API  = import.meta.env.VITE_PHP_API_URL  || 'http://localhost/backend-php';

// ── Node.js Axios Instance ───────────────────────────────────
export const api = axios.create({ baseURL: NODE_API });

api.interceptors.request.use((config) => {
  const storage = JSON.parse(localStorage.getItem('auth-storage') || '{}');
  const token = storage?.state?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/#/login';
    }
    return Promise.reject(err);
  }
);

// ── PHP Axios Instance ────────────────────────────────────────
export const phpApi = axios.create({ baseURL: PHP_API });

// ── Auth ─────────────────────────────────────────────────────
export const authService = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me:       ()     => api.get('/auth/me'),
};

// ── Products ──────────────────────────────────────────────────
export const productService = {
  getAll:  (params) => api.get('/products', { params }),
  getById: (id)     => api.get(`/products/${id}`),
  create:  (data)   => api.post('/products', data),
  update:  (id, data) => api.put(`/products/${id}`, data),
  delete:  (id)     => api.delete(`/products/${id}`),
};

// ── Orders ────────────────────────────────────────────────────
export const orderService = {
  getAll:       ()           => api.get('/orders'),
  getById:      (id)         => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

// ── PHP Products ──────────────────────────────────────────────
export const phpProductService = {
  getAll:  (search) => phpApi.get('/products.php', { params: { search } }),
  create:  (data)   => phpApi.post('/products.php', data),
  delete:  (id)     => phpApi.delete('/products.php', { params: { id } }),
};

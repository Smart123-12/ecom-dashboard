import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout     from './layouts/AdminLayout';
import Home            from './pages/Home';
import Dashboard       from './pages/Dashboard';
import Login           from './pages/Login';
import Register        from './pages/Register';
import ForgotPassword  from './pages/ForgotPassword';
import ResetPassword   from './pages/ResetPassword';
import Products        from './pages/Products';
import Orders          from './pages/Orders';
import Customers       from './pages/Customers';
import Analytics       from './pages/Analytics';
import Payments        from './pages/Payments';
import Notifications   from './pages/Notifications';
import Settings        from './pages/Settings';
import Coupons         from './pages/Coupons';
import UserManagement  from './pages/UserManagement';
import SellerDashboard from './pages/SellerDashboard';
import CartPage        from './pages/CartPage';
import CheckoutPage    from './pages/CheckoutPage';
import OrderSuccess    from './pages/OrderSuccess';
import WishlistPage    from './pages/WishlistPage';
import UserDashboard   from './pages/UserDashboard';
import ProductDetail   from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Customer Website ─────────────── */}
        <Route path="/"                element={<Home />} />
        <Route path="/product/:id"     element={<ProductDetail />} />
        <Route path="/cart"            element={<CartPage />} />
        <Route path="/checkout"        element={<CheckoutPage />} />
        <Route path="/order-success"   element={<OrderSuccess />} />
        <Route path="/wishlist"        element={<WishlistPage />} />
        <Route path="/my-account"      element={<UserDashboard />} />
        <Route path="/seller"          element={<SellerDashboard />} />

        {/* ── Auth ─────────────────────────── */}
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />

        {/* ── Admin Panel ──────────────────── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index                element={<Dashboard />} />
          <Route path="analytics"     element={<Analytics />} />
          <Route path="orders"        element={<Orders />} />
          <Route path="products"      element={<Products />} />
          <Route path="customers"     element={<Customers />} />
          <Route path="payments"      element={<Payments />} />
          <Route path="coupons"       element={<Coupons />} />
          <Route path="users"         element={<UserManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings"      element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

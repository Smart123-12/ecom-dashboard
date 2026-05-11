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
import SellerDashboard from './pages/SellerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer-Facing Website */}
        <Route path="/"       element={<Home />} />
        <Route path="/seller" element={<SellerDashboard />} />

        {/* Public Auth Routes */}
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index                element={<Dashboard />} />
          <Route path="analytics"     element={<Analytics />} />
          <Route path="orders"        element={<Orders />} />
          <Route path="products"      element={<Products />} />
          <Route path="customers"     element={<Customers />} />
          <Route path="payments"      element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings"      element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

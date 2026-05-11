const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const helmet   = require('helmet');
const morgan   = require('morgan');
const rateLimit = require('express-rate-limit');
const path     = require('path');
const fs       = require('fs');

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
//  Logging (Morgan → file + console)
// ─────────────────────────────────────────────
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));  // console

// ─────────────────────────────────────────────
//  Security Middleware
// ─────────────────────────────────────────────
app.use(helmet());  // XSS, clickjacking, HSTS, etc.
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// ─────────────────────────────────────────────
//  Rate Limiting (API protection)
// ─────────────────────────────────────────────
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: { message: 'Too many requests, please try again later.' } });
const authLimiter   = rateLimit({ windowMs: 15 * 60 * 1000, max: 20,  message: { message: 'Too many login attempts, please wait 15 minutes.' } });
app.use(globalLimiter);

// ─────────────────────────────────────────────
//  Body Parsers
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─────────────────────────────────────────────
//  Static File Serving (uploaded images)
// ─────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────
app.use('/api/auth',     authLimiter, require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }));

// ─────────────────────────────────────────────
//  404 Handler
// ─────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));

// ─────────────────────────────────────────────
//  Global Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// ─────────────────────────────────────────────
//  Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

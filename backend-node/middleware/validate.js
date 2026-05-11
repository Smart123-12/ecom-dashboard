const { body, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
};

// Auth validation rules
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name too short'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validate,
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Product validation rules
const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('inventory').isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer'),
  body('categoryId').isInt({ min: 1 }).withMessage('Valid category required'),
  validate,
];

module.exports = { validateRegister, validateLogin, validateProduct, validate };

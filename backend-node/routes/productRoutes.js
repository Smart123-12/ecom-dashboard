const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProduct } = require('../middleware/validate');

// Public
router.get('/',    getProducts);
router.get('/:id', getProductById);

// Admin only — with image upload support
router.post('/',    protect, adminOnly, upload.array('images', 5), validateProduct, createProduct);
router.put('/:id',  protect, adminOnly, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;

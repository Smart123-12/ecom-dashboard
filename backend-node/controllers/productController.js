const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      ...(search && { name: { contains: search } }),
      ...(category && { categoryId: Number(category) }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({ where, include: { category: true }, skip: Number(skip), take: Number(limit) }),
      prisma.product.count({ where }),
    ]);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products.', error: err.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) }, include: { category: true } });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product.', error: err.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, inventory, categoryId } = req.body;
    const product = await prisma.product.create({ data: { name, description, price: Number(price), inventory: Number(inventory), categoryId: Number(categoryId) } });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product.', error: err.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, inventory } = req.body;
    const product = await prisma.product.update({ where: { id: Number(req.params.id) }, data: { name, description, price: Number(price), inventory: Number(inventory) } });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product.', error: err.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product.', error: err.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

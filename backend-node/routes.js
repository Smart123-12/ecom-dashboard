const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- PRODUCTS API ---
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, description, price, inventory, categoryId } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, inventory, categoryId }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// --- ORDERS API ---
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { user: true } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;

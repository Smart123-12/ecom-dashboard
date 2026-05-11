const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: { select: { name: true, email: true } }, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: err.message });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { user: true, items: { include: { product: true } } },
    });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order.', error: err.message });
  }
};

// PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({ where: { id: Number(req.params.id) }, data: { status } });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status.', error: err.message });
  }
};

module.exports = { getOrders, getOrderById, updateOrderStatus };

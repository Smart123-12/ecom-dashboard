const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database with demo data...');

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin Manager',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // 2. Create Category
  const category = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Gadgets and gear.',
    },
  });

  // 3. Create Product
  const product = await prisma.product.create({
    data: {
      name: 'Premium Wireless Headphones',
      description: 'Noise-cancelling wireless headphones.',
      price: 299.99,
      inventory: 45,
      categoryId: category.id,
    },
  });

  console.log({ admin, category, product });
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

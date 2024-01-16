const { PrismaClient } = require('@prisma/client');
const ordersData = require('./dataSeed/orderData.json');

const prisma = new PrismaClient();

async function createOrder() {
  const orders = Promise.all(ordersData.map(async (orderData) => {
    const order = prisma.order.upsert({
      where: { id: orderData.id },
      update: {},
      create: orderData,
    });
    return order;
  }));

  return orders;
}

module.exports = {
  createOrder,
};

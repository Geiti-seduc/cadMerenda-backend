const { PrismaClient } = require('@prisma/client');
const totalOrdersData = require('./dataSeed/totalOrderData.json');

const prisma = new PrismaClient();

async function createTotalOrder() {
  const totalOrders = Promise.all(totalOrdersData.map(async (totalOrderData) => {
    const totalOrder = prisma.total_Order.upsert({
      where: { id: totalOrderData.id },
      update: {},
      create: totalOrderData,
    });
    return totalOrder;
  }));
  return totalOrders;
}

module.exports = {
  createTotalOrder,
};

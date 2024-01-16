const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Total_Order = prisma.total_Order;

const getTotalOrders = async () => {
  const totalOrder = await Total_Order.findMany();
  return totalOrder;
};

const getTotalOrderById = async (id) => {
  const total_Order = await Total_Order.findUnique({
    where: {
      id,
    },
  });
  return total_Order;
};

const createTotalOrder = async (order_id, offer_id) => {
  const total_Order = await Total_Order.create({ data: order_id, offer_id });
  return total_Order;
};

const updateTotalOrder = async (id, totalOrderData) => {
  const oldData = await Total_Order.findUnique({ where: { id } });
  if (oldData) {
    const total_Order = await Total_Order.update({
      where: {
        id,
      },
      data: totalOrderData,
    });
    return total_Order;
  }
  return null;
};

const deleteTotal_Order = async (id) => {
  const foundOrder = await Total_Order.findUnique({ where: { id } });
  if (foundOrder) {
    await Total_Order.delete({ where: { id } });
    return foundOrder;
  }
};

module.exports = {
  getTotalOrders,
  getTotalOrderById,
  createTotalOrder,
  deleteTotal_Order,
  updateTotalOrder,
};

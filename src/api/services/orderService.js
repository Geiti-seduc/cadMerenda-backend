const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Order = prisma.order;

const getOrders = async () => {
  const Orders = await Order.findMany();
  return Orders;
};

// eslint-disable-next-line
const getOrderById = async (id) => {
  const orderById = await Order.findUnique({
    where: {
      id,
    },
    include: {
      general_list: {
        include: {
          modality: true,
        },
      },
      requested_products: {
        include: {
          food: true,
        },
      },
    },
  });

  if (!orderById) {
    return null;
  }

  const requested_products = [];

  // eslint-disable-next-line
  orderById.requested_products.map((product) => {
    const productMap = {
      id: product.food.id,
      nmc: product.food.nmc,
      quantity: product.quantity,
      name: product.food.name,
      measure: product.food.measure,
      category: product.food.category,
      description: product.food.description,
    };
    requested_products.push(productMap);
  });

  const order = {
    id: orderById.id,
    school_inep: orderById.school_inep,
    cycle_id: orderById.cycle_id,
    general_list_id: orderById.general_list_id,
    modality_id: orderById.general_list.modality_id,
    modality_name: orderById.general_list.modality.name, 
    requested_products,
  };
  return order;
};

// eslint-disable-next-line
const getOrderBySchoolAndCycle = async (school_inep, cycle_id) => {
  const orderBySchoolAndCycle = await Order.findMany({
    where: {
      school_inep,
      cycle_id,
    },
    include: {
      general_list: {
        include: {
          modality: true,
        },
      },
      requested_products: {
        include: {
          food: true,
        },
      },
    },
  });
  return orderBySchoolAndCycle;
};

// eslint-disable-next-line
const getTotalOrder = async (school_inep, cycle_id) => {
  const orders = await getOrderBySchoolAndCycle(school_inep, cycle_id);
  const totalProducts = [];
  const totalOrdersIds = [];
  // eslint-disable-next-line
  orders.map((order) => {
    // eslint-disable-next-line
    order.requested_products.map((product) => {
      const verifyOccurrence = totalProducts.findIndex(
        (item) => item.food_id === product.food.id,
      );
      if (verifyOccurrence >= 0) {
        totalProducts[verifyOccurrence].quantity += product.quantity;
      } else {
        totalProducts.push({
          food_id: product.food.id,
          nmc: product.food.nmc,
          quantity: product.quantity,
          frequency: product.frequency,
          name: product.food.name,
          description: product.food.description,
          measure: product.food.measure,
          category: product.food.category,
        });
      }
    });
    totalOrdersIds.push(order.id);
  });
  const totalOrder = {
    school_inep: orders[0].school_inep,
    cycle_id: orders[0].cycle_id,
    totalProducts,
    totalOrdersIds,
  };
  return totalOrder;
};

const getOrderBySchool = async (school_inep) => {
  const orderBySchool = await Order.findMany({
    where: {
      school_inep,
    },
    include: {
      requested_products: {
        include: {
          food: true,
        },
      },
    },
  });
  return orderBySchool;
};

// eslint-disable-next-line max-lines-per-function
const getOrderBySchoolAndModality = async (school_inep, cycle_id) => {
  const orderBySchoolAndModality = await Order.findMany({
    where: {
      school_inep,
      cycle_id,
    },
    include: {
      general_list: {
        include: {
          modality: true,
        },
      },
      requested_products: {
        include: {
          food: true,
        },
      },
    },
  });
  return orderBySchoolAndModality;
};

const createOrder = async (orderData) => {
  const newOrder = await Order.create({
    data: {
      ...orderData,
    },
  });
  return newOrder;
};

const updateOrder = async (id, orderData) => {
  const { school_inep } = orderData;
  const oldOrder = await Order.findUnique({ where: { id } });
  if (oldOrder) {
    const updatedOrder = await Order.update({
      where: { id },
      data: {
        school_inep,
      },
    });

    return updatedOrder;
  }
  return null;
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findUnique({ where: { id } });
  if (deletedOrder) {
    await Order.delete({ where: { id } });
    return deletedOrder;
  }
};

module.exports = {
  getOrders,
  getOrderById,
  getOrderBySchool,
  getTotalOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderBySchoolAndCycle,
  getOrderBySchoolAndModality,
};

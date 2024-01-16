/* eslint-disable max-lines-per-function */
const OrderService = require('../services/orderService');
const RequestedService = require('../services/requestedService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DB_TABLE = 'Order';

const getOrders = async (req, res) => {
  try {
    const listOrder = await OrderService.getOrders();
    return res.status(200).json(listOrder);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const Order = await OrderService.getOrderById(id);
    if (!Order) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Order);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOrderBySchoolAndCycle = async (req, res) => {
  try {
    const { school_inep, cycle_id } = req.params;
    const Order = await OrderService.getOrderBySchoolAndCycle(
      school_inep,
      cycle_id,
    );
    if (!Order) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Order);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getTotalOrder = async (req, res) => {
  try {
    const { school_inep, cycle_id } = req.params;
    const Order = await OrderService.getTotalOrder(school_inep, cycle_id);
    if (!Order) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Order);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOrderBySchool = async (req, res) => {
  try {
    const { school_inep } = req.params;
    const Order = await OrderService.getOrderBySchool(school_inep);
    if (!Order) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Order);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOrderBySchoolAndModality = async (req, res) => {
  try {
    const { school_inep, cycle_id } = req.params;
    const Order = await OrderService.getOrderBySchoolAndModality(school_inep, cycle_id);
    if (!Order) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Order);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { school_inep, cycle_id, general_list_id, requested_products } = req.body;
    const orderData = { school_inep, general_list_id, cycle_id };

    const newOrder = await OrderService.createOrder(orderData);
    logsController.creationLog(newOrder, DB_TABLE, userId);

    const requestedProducts = await Promise.all(requested_products.map(async (item) => {
      const { food_id, quantity, frequency } = item;
      const orderFoodData = { order_id: newOrder.id, food_id, quantity, frequency };

      await RequestedService.createRequested(orderFoodData);
      logsController.creationLog(orderFoodData, 'Requested_Products', userId);

      return orderFoodData;
    }));

    return res.status(201).json({ newOrder, requestedProducts });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { school_inep, general_list_id, cycle_id, requested_products } = req.body;
    const orderData = { school_inep, general_list_id, cycle_id };

    const oldData = await OrderService.getOrderById(id);
    ['modality_id', 'modality_name', 'requested_products'].forEach((key) => delete oldData[key]);

    const updatedOrder = await OrderService.updateOrder(id, orderData);

    if (!updatedOrder) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }

    logsController.updateLog(oldData, updatedOrder, DB_TABLE, userId);

    const requestedProductsModified = await Promise.all(requested_products.map(
      async (item) => {
        const { food_id, quantity, frequency, exists } = item;
        if (!exists) {
          const RequestedData = { quantity, frequency, order_id: updatedOrder.id, food_id };
          const newRequestedProduct = await RequestedService.createRequested(RequestedData);
          logsController.creationLog(newRequestedProduct, 'Requested_Products', userId);
          return newRequestedProduct;
        }
          const oldRequestedProduct = await RequestedService.getRequestedByFoodId(
            updatedOrder.id, 
            food_id,
          );
          const requestedProduct = await RequestedService.updateRequestedByFoodId(
            updatedOrder.id, 
            food_id, 
            {
              quantity,
              frequency,
              order_id: updatedOrder.id,
              food_id,
            },
          );
          logsController.updateLog(
            oldRequestedProduct, requestedProduct, 'Requested_Products', userId,
          );
  
          return requestedProduct;
      },
    ));

    return res.status(200).json({
      updatedOrder,
      requestedProductsModified,
    });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletedOrder = await OrderService.deleteOrder(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletedOrder, DB_TABLE, userId);
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
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

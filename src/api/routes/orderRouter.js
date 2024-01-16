const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];
const postRoles = ['gestor'];
const putRoles = ['gestor'];
const delRoles = [''];

const Order = express.Router();
const orderController = require('../controllers/orderController');

Order.get('/', loginRequired(getRoles), orderController.getOrders);

Order.get('/:id', loginRequired(getRoles), orderController.getOrderById);

Order.get(
  '/school/:school_inep',
  loginRequired(getRoles),
  orderController.getOrderBySchool,
);

Order.get(
  '/school/:school_inep/:cycle_id',
  loginRequired(getRoles),
  orderController.getOrderBySchoolAndCycle,
);

Order.get(
  '/school/:school_inep/:cycle_id/total',
  loginRequired(getRoles),
  orderController.getTotalOrder,
);

Order.get(
  '/school/:school_inep/cycle/:cycle_id',
  loginRequired(getRoles),
  orderController.getOrderBySchoolAndModality,
);

Order.post('/create', loginRequired(postRoles), orderController.createOrder);

Order.put('/:id/', loginRequired(putRoles), orderController.updateOrder);

Order.delete('/:id/', loginRequired(delRoles), orderController.deleteOrder);

module.exports = Order;

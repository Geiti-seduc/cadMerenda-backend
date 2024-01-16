const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'gestor', 'nutricionista'];
const postRoles = ['nutricionista'];
const putRoles = ['nutricionista'];
const delRoles = ['nutricionista'];

const general_list_foodRouter = express.Router();
const general_list_foodController = require('../controllers/general_list_foodController');

general_list_foodRouter.get(
  '/',
  loginRequired(getRoles),
  general_list_foodController.getgeneral_list_food,
);

general_list_foodRouter.get(
  '/:id',
  loginRequired(getRoles),
  general_list_foodController.getgeneral_list_foodById,
);

general_list_foodRouter.post(
  '/post', // obs: foi incluído o /post no create devido ao conflito com a rota /:token
  loginRequired(postRoles),
  general_list_foodController.creategeneral_list_food,
);

general_list_foodRouter.put(
  '/:id',
  loginRequired(putRoles),
  general_list_foodController.updategeneral_list_food,
);

general_list_foodRouter.delete(
  '/:id',
  loginRequired(delRoles),
  general_list_foodController.deletegeneral_list_food,
);

module.exports = general_list_foodRouter;

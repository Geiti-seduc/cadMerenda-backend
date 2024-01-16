const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];
const postRoles = ['nutricionista', 'admin'];
const putRoles = ['nutricionista'];
const delRoles = ['nutricionista'];

const foodRouter = express.Router();
const foodController = require('../controllers/foodController');

foodRouter.get('/', loginRequired(getRoles), foodController.getAllFood);
foodRouter.get('/:id', loginRequired(getRoles), foodController.getFoodById);
foodRouter.post('/', loginRequired(postRoles), foodController.createFood);
foodRouter.put('/:id', loginRequired(putRoles), foodController.updateFood);
foodRouter.delete('/:id', loginRequired(delRoles), foodController.deletedFood);

module.exports = foodRouter;

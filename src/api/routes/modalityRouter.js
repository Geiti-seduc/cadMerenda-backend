const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['gestor', 'nutricionista', 'admin'];
const postRoles = ['admin'];
const putRoles = ['admin'];
const delRoles = ['admin'];

const modalityRouter = express.Router();
const modalityController = require('../controllers/modalityController');

modalityRouter.get('/', loginRequired(getRoles), modalityController.getModalities);
modalityRouter.get('/:id', loginRequired(getRoles), modalityController.getModalityById);
modalityRouter.post('/', loginRequired(postRoles), modalityController.createModality);
modalityRouter.put('/:id', loginRequired(putRoles), modalityController.updateModality);
modalityRouter.delete('/:id', loginRequired(delRoles), modalityController.deletedModality);

module.exports = modalityRouter;

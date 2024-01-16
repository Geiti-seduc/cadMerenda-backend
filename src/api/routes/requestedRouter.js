const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];
const postRoles = ['gestor'];
const putRoles = ['gestor'];
const delRoles = [''];

const Requested = express.Router();
const RequestedController = require('../controllers/requestedController');

Requested.get('/', loginRequired(getRoles), RequestedController.getRequested);

Requested.get('/:id', loginRequired(getRoles), RequestedController.getRequestedById);

Requested.post('/', loginRequired(postRoles), RequestedController.createRequested);

Requested.put('/:id', loginRequired(putRoles), RequestedController.updateRequested);

Requested.delete('/:id', loginRequired(delRoles), RequestedController.deleteRequested);

module.exports = Requested;
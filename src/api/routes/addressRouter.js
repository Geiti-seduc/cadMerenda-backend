const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'nutricionista', 'admin', 'gestor'];
const postRoles = ['fornecedor'];
const putRoles = ['fornecedor'];
const delRoles = [];

const addressRouter = express.Router();
const addressController = require('../controllers/addressController');

addressRouter.get('/', loginRequired(getRoles), addressController.getAllAddress);
addressRouter.get('/:address_id', loginRequired(getRoles), addressController.getAddressById);
addressRouter.post('/', loginRequired(postRoles), addressController.createNewAddress);
addressRouter.put('/:address_id', loginRequired(putRoles), addressController.updateAddress);
addressRouter.delete('/:address_id', loginRequired(delRoles), addressController.deletedAddress);

module.exports = addressRouter;

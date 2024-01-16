const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['gestor', 'admin', 'fornecedor'];
const postRoles = ['fornecedor'];
const putRoles = ['fornecedor'];
const delRoles = [''];

const supplierController = require('../controllers/supplierController');

const supplierRouter = express.Router();

supplierRouter.get('/', loginRequired(getRoles), supplierController.getAllSuppliers);

supplierRouter.get('/:id', loginRequired(getRoles), supplierController.getSuppliersById);

supplierRouter.get('/user/:user_id', loginRequired(getRoles),
supplierController.getSupplierByUserId);
supplierRouter.post('/', loginRequired(postRoles), supplierController.createSupplier);
supplierRouter.put('/:id', loginRequired(putRoles), supplierController.updateSupplier);
supplierRouter.delete('/:id', loginRequired(delRoles), supplierController.deletedSupplier);

module.exports = supplierRouter;
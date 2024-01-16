const express = require('express');
const loginRequired = require('../middleware/loginRequired');
const schoolAndSupplierController = require('../controllers/schoolAndSupplierController');

const getRoles = ['fornecedor'];

const schoolAndSupplierRouter = express.Router();

schoolAndSupplierRouter.get('/', loginRequired(getRoles),
schoolAndSupplierController.getSchoolAndSupplierData);

module.exports = schoolAndSupplierRouter;

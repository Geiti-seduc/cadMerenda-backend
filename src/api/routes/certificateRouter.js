const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'gestor', 'admin'];
const postRoles = ['fornecedor'];
const putRoles = ['fornecedor'];
const delRoles = [];

const certificateRouter = express.Router();

const certificateController = require('../controllers/certificateController');

certificateRouter.get('/', loginRequired(getRoles), certificateController.getAllcertificate);
certificateRouter.get('/:id', loginRequired(getRoles), certificateController.getcertificateById);
certificateRouter.post('/', loginRequired(postRoles), certificateController.createNewcertificate);
certificateRouter.put('/:id', loginRequired(putRoles), certificateController.updateCertificate);
certificateRouter.delete('/:id', loginRequired(delRoles), certificateController.deletedcertificate);

module.exports = certificateRouter;

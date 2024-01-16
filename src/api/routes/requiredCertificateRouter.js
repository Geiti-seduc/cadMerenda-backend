const express = require('express');
const getRequiredCertificateController = require('../controllers/requiredCertificateController');
const loginRequired = require('../middleware/loginRequired');

const getIDRoles = ['admin', 'fornecedor'];
const postRoles = ['admin'];
const getExpirationRoles = ['admin', 'fornecedor', 'gestor'];

const routerRequiredCertificate = express.Router();

routerRequiredCertificate.get('/', getRequiredCertificateController.getRequiredCertificate);

routerRequiredCertificate.get('/:id', loginRequired(getIDRoles),
getRequiredCertificateController.getRequiredCertificateById);

routerRequiredCertificate.get('/expiration/:id', loginRequired(getExpirationRoles),
getRequiredCertificateController.getRequiredCertificatesWithExpiration);

routerRequiredCertificate.post('/create',
loginRequired(postRoles), getRequiredCertificateController.createRequiredCertificate);

routerRequiredCertificate.put('/:id', loginRequired(getIDRoles),
getRequiredCertificateController.updateRequiredCertificate);

routerRequiredCertificate.delete('/:id', loginRequired(getIDRoles),
getRequiredCertificateController.deleteRequiredCertificate);

module.exports = routerRequiredCertificate;

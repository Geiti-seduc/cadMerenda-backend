const express = require('express');
const multer = require('../middleware/multer');
const loginRequired = require('../middleware/loginRequired');

const postRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];

const uploadRouter = express.Router();
const uploadController = require('../controllers/uploadController');

uploadRouter.post('/create/:archName/:userId', multer.single('pdf'),
  uploadController.createCertificate);

uploadRouter.put('/update/:required_certificate_id/:archName/:userId', loginRequired(postRoles),
  multer.single('pdf'), uploadController.updateCertificate);

module.exports = uploadRouter;

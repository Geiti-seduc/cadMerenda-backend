const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const downloadRouter = express.Router();
const downloadController = require('../controllers/downloadController');

const getRoles = ['fornecedor', 'admin', 'gestor'];
const getReportRoles = ['gestor'];

downloadRouter.get(
  '/:id',
  loginRequired(getRoles),
  downloadController.downloadFile,
);
downloadRouter.get(
  '/report/:inep/:cycleId',
  loginRequired(getReportRoles),
  downloadController.downloadReport,
);

module.exports = downloadRouter;

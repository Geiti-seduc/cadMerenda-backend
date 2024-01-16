const express = require('express');
const loginRequired = require('../middleware/loginRequired');
const cycleController = require('../controllers/cycleController');

const getRoles = ['admin', 'gestor', 'nutricionista', 'admin-nutri', 'fornecedor'];
const postRoles = ['admin'];
const putRoles = ['admin'];
const delRoles = ['admin'];

const cycleRouter = express.Router();

cycleRouter.get('/', loginRequired(getRoles), cycleController.getCycles);
cycleRouter.get('/:cycleId', loginRequired(getRoles), cycleController.getCycleById);
cycleRouter.get('/last/desc', loginRequired(getRoles), cycleController.getLastCycle);
cycleRouter.get('/last/pending', loginRequired(getRoles), cycleController.getLastPendingCycle);
cycleRouter.post('/create', loginRequired(postRoles), cycleController.createCycle);
cycleRouter.put('/:cycleId', loginRequired(putRoles), cycleController.updateCycle);
cycleRouter.delete('/:cycleId', loginRequired(delRoles), cycleController.deleteCycle);

module.exports = cycleRouter;

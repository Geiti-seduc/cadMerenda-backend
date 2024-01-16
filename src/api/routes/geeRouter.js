const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['nutricionista', 'gestor', 'admin', 'fornecedor'];
const postRoles = ['admin'];
const putRoles = ['admin'];
const delRoles = ['admin'];

const geeRouter = express.Router();
const geeController = require('../controllers/geeController');

geeRouter.get('/', loginRequired(getRoles), geeController.getGEE);
geeRouter.get('/:id', loginRequired(getRoles), geeController.getGEEById);
geeRouter.post('/post', loginRequired(postRoles), geeController.createGEE); // obs: foi incluído o /post no create devido ao conflito com a rota /:token
geeRouter.put('/:id', loginRequired(putRoles), geeController.updateGEE);
geeRouter.delete('/:id', loginRequired(delRoles), geeController.deleteGEE);

module.exports = geeRouter;

const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];
const postRoles = ['fornecedor'];
const putRoles = ['fornecedor'];
const delRoles = [''];

const OfferedRouter = express.Router();
const OfferedController = require('../controllers/offeredController');

OfferedRouter.get('/', loginRequired(getRoles), OfferedController.getOffered);
OfferedRouter.get('/:id', loginRequired(getRoles), OfferedController.getOfferedById);
OfferedRouter.post('/', loginRequired(postRoles), OfferedController.createOffered); // é necessário corrigir esta rota e incluir na controller as variaveis quantity e brand;
OfferedRouter.put('/:id', loginRequired(putRoles), OfferedController.updateOffered); // ele retorna msg de "Logs created", mas não atualiza no banco
OfferedRouter.delete('/:id', loginRequired(delRoles), OfferedController.deleteOffered);

module.exports = OfferedRouter;

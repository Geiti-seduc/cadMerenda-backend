const express = require('express');
const userController = require('../controllers/userController');
const loginRequired = require('../middleware/loginRequired');

const getIDRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];
const postRoles = ['admin'];
const putRoles = ['admin'];
const delRoles = ['admin'];

const router = express.Router();

router.get('/', loginRequired(getIDRoles), userController.getUsers);
router.get('/inactive', loginRequired(getIDRoles), userController.getInactiveUsers);
router.get('/:id', loginRequired(getIDRoles), userController.getUserById);
router.get('/userInfo/:email', loginRequired(getIDRoles), userController.getUserByEmail);
router.post('/', loginRequired(postRoles), userController.createUser);
router.post('/createAndAssociateToSchool', loginRequired(postRoles),
userController.createUserAndAssociateToSchool);
router.put('/:id', loginRequired(putRoles), userController.updateUser);
router.delete('/:id', loginRequired(delRoles), userController.deleteUser);

module.exports = router;

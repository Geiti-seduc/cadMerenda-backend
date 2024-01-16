const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:user_cpf', userController.getUserById);

router.post('/', userController.createUser);

router.delete('/:user_cpf', userController.deleteUser);

router.put('/:user_cpf', userController.updateUser);

module.exports = router;
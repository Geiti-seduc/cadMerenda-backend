const express = require('express');
const defaultController = require('../controllers/defaultController');

const router = express.Router();

router.post('/login', defaultController.loginUser);
router.post('/register', defaultController.registerUser);
router.post('/token/:token', defaultController.returnToken);
router.post('/forgot-password/token', defaultController.forgotPassword);
router.post('/forgot-password/newPassword/:token', defaultController.extractInfoFromToken);
router.put('/forgot-password/updateUser/:id', defaultController.updateUser);

module.exports = router;

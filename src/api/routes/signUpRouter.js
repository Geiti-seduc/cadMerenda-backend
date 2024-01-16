const express = require('express');

const signUpController = require('../controllers/signUpController');

const signUpRouter = express.Router();

signUpRouter.post('/create', signUpController.createNewUser);

module.exports = signUpRouter;
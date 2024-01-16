const express = require('express');
const loginRequired = require('../middleware/loginRequired');
const userSchoolController = require('../controllers/userAndSchoolController');

const getRoles = ['nutricionista', 'admin'];

const userAndSchoolRouter = express.Router();

userAndSchoolRouter.get('/', 
loginRequired(getRoles), userSchoolController.getAllUsersAndSchools);

module.exports = userAndSchoolRouter;

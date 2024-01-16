const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['nutricionista'];

const schoolAndAccessRouter = express.Router();
const schoolAndAccessController = require('../controllers/schoolAndAccessController');

schoolAndAccessRouter.get('/', loginRequired(getRoles),
schoolAndAccessController.getSchoolAndAccessData);

module.exports = schoolAndAccessRouter;

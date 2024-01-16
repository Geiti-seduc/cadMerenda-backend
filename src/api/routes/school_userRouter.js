const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['gestor', 'admin'];
const postRoles = ['admin'];
const putRoles = ['admin'];
const delRoles = ['admin'];

const schoolRouter = express.Router();
const school_userController = require('../controllers/school_userController');

schoolRouter.get('/', loginRequired(getRoles), school_userController.getSchool_Users);
schoolRouter.get('/:id', loginRequired(getRoles), school_userController.getSchool_UserById);
schoolRouter.post('/', loginRequired(postRoles), school_userController.createSchool_User);
schoolRouter.put('/:id', loginRequired(putRoles), school_userController.updateSchool_User);
schoolRouter.delete('/:id', loginRequired(delRoles), school_userController.deleteSchool_User);

module.exports = schoolRouter;
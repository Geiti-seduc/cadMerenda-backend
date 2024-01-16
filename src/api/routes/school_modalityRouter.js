const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['nutricionista', 'gestor', 'admin'];
const postRoles = ['admin'];
const putRoles = ['gestor', 'admin'];
const delRoles = ['admin'];

const school_modalityRouter = express.Router();
const school_modalityController = require('../controllers/school_modalityController');

school_modalityRouter.get(
  '/',
  loginRequired(getRoles),
  school_modalityController.getschool_modality,
);

school_modalityRouter.get(
  '/:id',
  loginRequired(getRoles),
  school_modalityController.getschool_modalityById,
);

school_modalityRouter.get(
  '/school/:inep',
  loginRequired(getRoles),
  school_modalityController.getSchoolById,
);

school_modalityRouter.post(
  '/create',
  loginRequired(postRoles),
  school_modalityController.createschool_modality,
);

school_modalityRouter.put(
  '/:id',
  loginRequired(putRoles),
  school_modalityController.updateschool_modality,
);

school_modalityRouter.delete(
  '/:id',
  loginRequired(delRoles),
  school_modalityController.deleteschool_modality,
);

module.exports = school_modalityRouter;

const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'gestor', 'admin', 'nutricionista'];
const postRoles = ['admin'];
const putRoles = ['admin', 'gestor'];
const delRoles = ['admin'];
const schoolInfoRoles = ['admin', 'nutricionista'];

const schoolRouter = express.Router();
const schoolController = require('../controllers/schoolController');

schoolRouter.get('/', loginRequired(getRoles), schoolController.getAllScool);

schoolRouter.get(
  '/:inep',
  loginRequired(getRoles),
  schoolController.getSchoolById,
);

schoolRouter.get(
  '/city/:city',
  loginRequired(getRoles),
  schoolController.getSchoolByCity,
);

schoolRouter.get(
  '/gee/:gee',
  loginRequired(getRoles),
  schoolController.getSchoolsByGee,
);

schoolRouter.post('/', loginRequired(postRoles), schoolController.createScholl);

schoolRouter.put(
  '/:inep',
  loginRequired(putRoles),
  schoolController.updateSchool,
);

schoolRouter.delete(
  '/:inep',
  loginRequired(delRoles),
  schoolController.deleteSchool,
);

schoolRouter.get(
  '/schoolInfo/:inep',
  loginRequired(schoolInfoRoles),
  schoolController.getSchoolInfo,
);

// rota para pegar escolas por gere ou/e cidade por queries
// exemplo: /school/schoolByGeeAndCity?gee=EMEF%20JOSE%20DE%20ALENCAR&city=SAO%20PAULO
schoolRouter.get(
  '/filter/gee-city/',
  loginRequired(getRoles),
  schoolController.getSchoolByGeeAndCity,
);

module.exports = schoolRouter;

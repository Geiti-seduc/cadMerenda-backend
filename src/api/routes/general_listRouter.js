const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'gestor', 'nutricionista', 'admin'];
const postRoles = ['nutricionista', 'admin'];
const putRoles = ['nutricionista', 'admin'];
const delRoles = ['nutricionista', 'admin'];

const general_listRouter = express.Router();
const general_listController = require('../controllers/general_listController');

general_listRouter.get('/', loginRequired(getRoles),
  general_listController.getGeneral_List);

general_listRouter.get('/:id', loginRequired(getRoles),
  general_listController.getGeneral_ListById);

general_listRouter.get('/cycle/:cycle_id', loginRequired(getRoles),
  general_listController.getGeneral_ListByCycle);

general_listRouter.get('/school/:school_id/cycle/:cycle_id', loginRequired(getRoles),
  general_listController.getGeneralListByInepAndModality);

// Create GeneralList
general_listRouter.post('/create', loginRequired(postRoles),
  general_listController.createGeneral_List);

// Update GeneralList
general_listRouter.put('/:id', loginRequired(putRoles),
  general_listController.updateGeneral_List);

// Update GeneralList com food e modality
general_listRouter.put('/update/:id', loginRequired(putRoles),
  general_listController.updateGeneralListModalityAndListFood);

// Delete GeneralList
general_listRouter.delete('/:id', loginRequired(delRoles),
  general_listController.deleteGeneral_List);

general_listRouter.get('/school/:school_id', loginRequired(getRoles),
  general_listController.getGeneral_ListBySchool);

module.exports = general_listRouter;

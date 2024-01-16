const school_modalityService = require('../services/school_modalityService');
const logsController = require('./logsController');
const schoolService = require('../services/schoolService');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'School_Modality';

const getschool_modality = async (req, res) => {
  try {
    const getAll = await school_modalityService.getschool_modality();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getschool_modalityById = async (req, res) => {
  try {
    const { id } = req.params;
    const school_modalityId = await school_modalityService.getschool_modalityById(id);
    if (!school_modalityId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(201).json(school_modalityId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const { inep } = req.params;
    let school = await schoolService.getSchoolById(inep);
    const modality = await school_modalityService.getSchoolModalities(inep);
    if (!school) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    school = { ...school, modality };
    return res.status(200).json(school);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createschool_modality = async (req, res) => {
  try {
    const { userId } = req;
    const { modality_id, school_inep } = req.body;
    const school_modalityData = { modality_id, school_inep };
    const newschool_modality = await school_modalityService
    .createschool_modality(school_modalityData);
    logsController.creationLog(newschool_modality, DATA_TABLE, userId);
    return res.status(201).json(newschool_modality);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line
const updateschool_modality = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { school_inep, modality_id } = req.body;
    // const { name, address_id, school_inep } = req.body; foi removido name e address_is e acrecentando modality_id para ser possível realizar a atualização
    const school_modalityData = { school_inep, modality_id };
    const oldschool_modality = await school_modalityService.getschool_modalityById(id);
    // eslint-disable-next-line max-len
    const upschool_modality = await school_modalityService.updateschool_modality(
        id,
        school_modalityData,
      );
    if (!upschool_modality) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(
      oldschool_modality,
      upschool_modality,
      DATA_TABLE,
      userId,
    );
    return res.status(200).json(upschool_modality);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line 
const deleteschool_modality = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletschool_modality = await school_modalityService.deleteschool_modality(id);
    if (!deletschool_modality) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletschool_modality, DATA_TABLE, userId);
    return res
      .status(200)
      .json({ message: 'school_modality deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getschool_modality,
  getschool_modalityById,
  getSchoolById,
  createschool_modality,
  updateschool_modality,
  deleteschool_modality,
};

const ModalityService = require('../services/modalityService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Modality';

const getModalities = async (req, res) => {
  try {
    const getAll = await ModalityService.getModalities();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getModalityById = async (req, res) => {
  try {
    const { id } = req.params;
    const ModalityId = await ModalityService.getModalityById(id);
    if (!ModalityId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(201).json(ModalityId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createModality = async (req, res) => {
  try {
    const { userId } = req;
    const { id, name, description } = req.body;
    const ModalityData = { id, name, description };
    const newModality = await ModalityService.createModality(ModalityData);
    logsController.creationLog(newModality, DATA_TABLE, userId);
    return res.status(201).json(newModality);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateModality = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { name, description } = req.body;
    const ModalityData = { name, description };
    const oldModality = await ModalityService.getModalityById(id);
    const upModality = await ModalityService.updateModality(id, ModalityData);
    if (!upModality) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldModality, upModality, DATA_TABLE, userId);
    return res.status(200).json(upModality);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletedModality = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletModality = await ModalityService.deleteModality(id);
    if (!deletModality) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletModality, DATA_TABLE, userId);
    return res.status(200).json({ message: 'Modality deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getModalities,
  getModalityById,
  createModality,
  updateModality,
  deletedModality,
};

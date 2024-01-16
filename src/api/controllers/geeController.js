const GEEService = require('../services/geeService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Gee';

const getGEE = async (req, res) => {
  try {
    const getAll = await GEEService.getGEE();
    return res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getGEEById = async (req, res) => {
  try {
    const { id } = req.params;
    const GEEId = await GEEService.getGEEById(id);
    if (!GEEId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(201).json(GEEId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line complexity
const createGEE = async (req, res) => {
  try {
    const { userId } = req;
    const { name, address_id } = req.body;
    // const { id, name, address_id, school_inep } = req.body; foi removido da linha de cima os intens id e school inep, pois o modelo prisma não pede esses dados para criação da Gee
    // eslint-disable-next-line max-len
    if (!name || !address_id) return res.status(400).json({ error: 'Missing data' });
    // if (!id || !name || !address_id || !school_inep) return res.status(400).json({ error: 'Missing data' }); seguindo o mesmo principio de cima
    const GEEData = { name, address_id };
    // const GEEData = { id, name, address_id, school_inep }; seguindo o mesmo principio anterior
    const newGEE = await GEEService.createGEE(GEEData);
    logsController.creationLog(newGEE, DATA_TABLE, userId);
    return res.status(201).json(newGEE);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line max-lines-per-function
const updateGEE = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { name, address_id } = req.body;
    // const { name, address_id, school_inep } = req.body; seguindo o mesmo principio de create
    const GEEData = { name, address_id };
    const upGEE = await GEEService.updateGEE(id, GEEData);
    if (!upGEE) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    const oldGEE = await GEEService.getGEEById(id);
    logsController.updateLog(oldGEE, upGEE, DATA_TABLE, userId);
    return res.status(200).json(upGEE);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteGEE = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletGEE = await GEEService.deleteGEE(id);
    if (!deletGEE) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletGEE, DATA_TABLE, userId);
    return res.status(200).json({ message: 'GEE deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getGEE,
  getGEEById,
  createGEE,
  updateGEE,
  deleteGEE,
};

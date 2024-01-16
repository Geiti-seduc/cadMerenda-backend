const OfferedService = require('../services/offeredService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Offered_Products';

const getOffered = async (req, res) => {
  try {
    const getAll = await OfferedService.getOffered();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOfferedById = async (req, res) => {
  try {
    const { id } = req.params;
    const OfferedId = await OfferedService.getOfferedById(id);
    if (!OfferedId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(OfferedId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createOffered = async (req, res) => {
  try {
    const { userId } = req;
    const { id, product_price, offer_id, food_id, quantity, frequency, brand } = req.body;
    const OfferedData = { id, product_price, offer_id, food_id, quantity, frequency, brand };
    const newOffered = await OfferedService.createOffered(OfferedData);
    logsController.creationLog(newOffered, DATA_TABLE, userId);
    return res.status(201).json(newOffered);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateOffered = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { product_price, offer_id, food_id, quantity, frequency, brand } = req.body;
    const OfferedData = { product_price, offer_id, food_id, quantity, frequency, brand };
    const oldOffered = await OfferedService.getOfferedById(id);
    const upOffered = await OfferedService.updateOffered(id, OfferedData);
    if (!upOffered) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldOffered, upOffered, DATA_TABLE, userId);
    return res.status(200).json(upOffered);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteOffered = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletOffered = await OfferedService.deleteOffered(id);
    if (!deletOffered) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletOffered, DATA_TABLE, userId);
    return res.status(200).json({ message: 'Offered deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getOffered,
  getOfferedById,
  createOffered,
  updateOffered,
  deleteOffered,
};

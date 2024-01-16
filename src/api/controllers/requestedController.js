const RequestedService = require('../services/requestedService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Requested_Products';

const getRequested = async (req, res) => {
  try {
    const getAll = await RequestedService.getRequested();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getRequestedById = async (req, res) => {
  try {
    const { id } = req.params;
    const RequestedId = await RequestedService.getRequestedById(id);
    if (!RequestedId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(RequestedId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createRequested = async (req, res) => {
  try {
    const { userId } = req;
    const { quantity, order_id, food_id, frequency } = req.body;
    const RequestedData = { quantity, order_id, food_id, frequency };
    const newRequested = await RequestedService.createRequested(RequestedData);
    logsController.creationLog(newRequested, DATA_TABLE, userId);
    return res.status(201).json(newRequested);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateRequested = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { quantity, order_id, food_id, frequency } = req.body;
    const RequestedData = { quantity, order_id, food_id, frequency };
    const oldRequested = await RequestedService.getRequestedById(id);
    const upRequested = await RequestedService.updateRequested(
      id,
      RequestedData,
    );
    if (!upRequested) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldRequested, upRequested, DATA_TABLE, userId);
    return res.status(200).json(upRequested);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteRequested = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const deletRequested = await RequestedService.deleteRequested(id);
    if (!deletRequested) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletRequested, DATA_TABLE, userId);
    return res.status(200).json({ message: 'Requested deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getRequested,
  getRequestedById,
  createRequested,
  updateRequested,
  deleteRequested,
};

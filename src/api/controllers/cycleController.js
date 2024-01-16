const cycleService = require('../services/cycleService');
const logsController = require('./logsController');

const ERRORINTERNAL = { error: 'Internal server error' };
const CYCLENOTFOUND = { error: 'Cycle not found' };
const DATA_TABLE = 'Cycle';

const getCycles = async (req, res) => {
  try {
    const cycles = await cycleService.getCycles();
    return res.status(200).json(cycles);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

const getCycleById = async (req, res) => {
  const { cycleId } = req.params;
  try {
    const cycle = await cycleService.getCycleById(cycleId);
    if (!cycle) {
      return res.status(404).json(CYCLENOTFOUND);
    }
    return res.status(200).json(cycle);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

const getLastCycle = async (req, res) => {
  try {
    const cycle = await cycleService.getLastCycle();
    if (!cycle) {
      return res.status(404).json(CYCLENOTFOUND);
    }
    return res.status(200).json(cycle);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

const getLastPendingCycle = async (req, res) => {
  try {
    const cycle = await cycleService.getLastPendingCycle();
    if (!cycle) {
      return res.status(404).json(CYCLENOTFOUND);
    }
    return res.status(200).json(cycle);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

const extractCycleData = ({
  startNutri,
  deadlineNutri,
  startSchool,
  deadlineSchool,
  startSupplier,
  deadlineSupplier,
  initSelectSupplier,
  deadlineSelectSupplier,
}) => ({
  startNutri,
  deadlineNutri,
  startSchool,
  deadlineSchool,
  startSupplier,
  deadlineSupplier,
  initSelectSupplier,
  deadlineSelectSupplier,
});

const createCycle = async (req, res) => {
  try {
    const cycleData = req.body;
    const newCycle = await cycleService.createCycle(cycleData);
    return res.status(201).json(newCycle);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

const updateCycle = async (req, res) => {
  try {
    const { userId } = req;
    const { cycleId } = req.params;
    const cycleData = extractCycleData(req.body);
    const updatedCycle = await cycleService.updateCycle(cycleId, cycleData);
    if (!updatedCycle) {
      return res.status(404).json(CYCLENOTFOUND);
    }
    const oldCycle = await cycleService.getCycleById(cycleId);
    logsController.updateLog(oldCycle, updatedCycle, DATA_TABLE, userId, cycleId);
    return res.status(200).json(updatedCycle);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

const deleteCycle = async (req, res) => {
  try {
    const { cycleId } = req.params;
    const deletedCycle = await cycleService.deleteCycle(cycleId);
    if (!deletedCycle) {
      return res.status(404).json(CYCLENOTFOUND);
    }
    return res.status(200).json(deletedCycle);
  } catch (error) {
    return res.status(500).json(ERRORINTERNAL);
  }
};

module.exports = {
  getCycles,
  getCycleById,
  getLastCycle,
  getLastPendingCycle,
  createCycle,
  updateCycle,
  deleteCycle,
};

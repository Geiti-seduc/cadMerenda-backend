const foodService = require('../services/foodService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Food';

const getAllFood = async (req, res) => {
  try {
    const getAll = await foodService.getAllFood();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodId = await foodService.getFoodById(id);
    if (!foodId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(foodId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createFood = async (req, res) => {
  try {
    const { userId } = req;
    const { name, description, measure, category, nmc } = req.body;
    const nmcAsInt = parseInt(nmc, 10);
    if (Number.isNaN(nmcAsInt)) {
      return res.status(400).json({ error: 'O campo nmc deve ser um número inteiro.' });
    }
    const foodData = { name, description, measure, category, nmc };
    const newFood = await foodService.createFood(foodData);
    logsController.creationLog(newFood, DATA_TABLE, userId);
    return res.status(201).json(newFood);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line max-lines-per-function, sonarjs/cognitive-complexity, complexity
const updateFood = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { name, description, measure, category, nmc } = req.body;
    if (!name || !description || !measure || !category || !nmc) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    const foodData = { name, description, measure, category, nmc };
    const oldFood = await foodService.getFoodById(id);
    const upFood = await foodService.updateFood(id, foodData);
    if (!upFood) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldFood, upFood, DATA_TABLE, userId);
    return res.status(200).json(upFood);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const deletedFood = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const deletFood = await foodService.deleteFood(id);
    if (!deletFood) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletFood, DATA_TABLE, userId);
    return res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deletedFood,
};

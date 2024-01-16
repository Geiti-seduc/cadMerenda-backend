const general_list_foodService = require('../services/general_list_foodService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'General_List_Food';

const getgeneral_list_food = async (req, res) => {
  try {
    const getAll = await general_list_foodService.getgeneral_list_food();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getgeneral_list_foodById = async (req, res) => {
  try {
    const { id } = req.params;
    const general_list_foodId = await general_list_foodService.getgeneral_list_foodById(
      id,
    );
    if (!general_list_foodId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(201).json(general_list_foodId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const creategeneral_list_food = async (req, res) => {
  try {
    const { userId } = req;
    const { food_id, general_list_id } = req.body;
    // const { id, food_id, general_list_id } = req.body; id removido da linha acima, pois não era possível fazer post sem passar ID
    // eslint-disable-next-line max-len
    if (!food_id || !general_list_id) return res.status(400).json({ error: 'Missing required data' });
    // if (!id || !food_id || !general_list_id) return res.status(400).json({ error: 'Missing required data' }); mesmo exemplo do comentário anterior
    const general_list_foodData = { food_id, general_list_id };
    const newgeneral_list_food = await general_list_foodService.creategeneral_list_food(
      general_list_foodData,
    );
    logsController.creationLog(newgeneral_list_food, DATA_TABLE, userId);
    return res.status(201).json(newgeneral_list_food);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updategeneral_list_food = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { food_id, general_list_id } = req.body;
    const general_list_foodData = { food_id, general_list_id };
    const oldgeneral_list_food = await general_list_foodService.getgeneral_list_foodById(id);
    const upgeneral_list_food = await general_list_foodService.updategeneral_list_food(
      id,
      general_list_foodData,
    );
    if (!upgeneral_list_food) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldgeneral_list_food, upgeneral_list_food, DATA_TABLE, userId);
    return res.status(200).json(upgeneral_list_food);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletegeneral_list_food = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
      const deletgeneral_list_food = await general_list_foodService.deletegeneral_list_food(id);
      if (!deletgeneral_list_food) {
        return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
      }
      logsController.deleteLog(deletgeneral_list_food, DATA_TABLE, userId);
      return res.status(200).json({ message: 'general_list_food deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getgeneral_list_food,
  getgeneral_list_foodById,
  creategeneral_list_food,
  updategeneral_list_food,
  deletegeneral_list_food,
};

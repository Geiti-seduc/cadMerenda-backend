const General_ListService = require('../services/general_listService');
const General_List_FoodService = require('../services/general_list_foodService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DB_TABLE = 'General_List';

const getGeneral_List = async (req, res) => {
  try {
    const listGeneral_List = await General_ListService.getGeneral_List();
    return res.status(200).json(listGeneral_List);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getGeneral_ListById = async (req, res) => {
  try {
    const { id } = req.params;
    const General_List = await General_ListService.getGeneral_ListById(id);
    if (!General_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(General_List);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getGeneral_ListBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;
    const General_List = await General_ListService.getGeneral_ListBySchool(
      school_id,
    );
    if (!General_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(General_List);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getGeneral_ListByCycle = async (req, res) => {
  try {
    const { cycle_id } = req.params;
    const General_List = await General_ListService.getGeneral_ListByCycle(
      cycle_id,
    );
    if (!General_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(General_List);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getGeneralListByInepAndModality = async (req, res) => {
  try {
    const { school_inep, cycle_id } = req.params;
    const General_List = await General_ListService.getGeneralListByInepAndModality(
      school_inep,
      cycle_id,
    );
    if (!General_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(General_List);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line max-lines-per-function
const createGeneral_List = async (req, res) => {
  try {
    const { userId } = req;
    const { description, cycle_id, modality_id, general_list_itens } = req.body;
    const General_ListData = { description, cycle_id, modality_id };
    const existingGeneral_List = await General_ListService.getGeneral_ListByCycleAndModality(
        cycle_id,
        modality_id,
      );
    if (existingGeneral_List.length > 0) {
      return res.status(409).json({ error: 'General List already exists' });
    }
    const newGeneral_List = await General_ListService.createGeneral_List(General_ListData);
    logsController.creationLog(newGeneral_List, DB_TABLE, userId);
    let General_List_Products = []; // o tipo da variável foi alterado para let ao invés de const, pois ele não tava aceitando a atualização da lista na hora de criar 
    General_List_Products = await Promise.all(general_list_itens.map(async (item) => {
      const General_ListItemData = {
        general_list_id: newGeneral_List.id,
        food_id: item,
      };
      await General_List_FoodService.creategeneral_list_food(General_ListItemData);
      logsController.creationLog(General_ListItemData, 'General_List_Food', userId);
      return General_ListItemData;
    }));

    return res.status(201).json({ newGeneral_List, General_List_Products });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

/* eslint-disable */
const updateGeneralListModalityAndListFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const {
      description,
      cycle_id,
      modality_id,
      general_list_itens,
      general_list_removed,
    } = req.body;
    const General_ListData = {
      description,
      cycle_id,
      modality_id,
      general_list_itens,
    };
    const oldData = await General_ListService.getGeneral_ListById(id);
    delete oldData.general_list_food;
    const updatedGeneral_List = await General_ListService.updateGeneralListModalityAndListFood(id, General_ListData);
    if (!updatedGeneral_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    await logsController.updateLog(oldData, updatedGeneral_List, DB_TABLE, userId);

    const general_list_remove = await Promise.all(general_list_removed.map(async (item) => {
      const food_remove = await General_List_FoodService.deletegeneral_list_foodByFoodId(item, updatedGeneral_List.id);
      logsController.deleteLog(food_remove, 'General_List_Food', userId);
      return food_remove;
    }));

    const general_list_add = await Promise.all(general_list_itens.map(async (item) => {
      const food_add = await General_List_FoodService.creategeneral_list_food({
        general_list_id: updatedGeneral_List.id,
        food_id: item,
      });
      logsController.creationLog(food_add, 'General_List_Food', userId);
      return food_add;
    }));

    return res.status(200).json({ updatedGeneral_List, general_list_remove, general_list_add });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line
const updateGeneral_List = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { description, cycle_id, modality_id, general_list_itens } = req.body;
    const General_ListData = { description, cycle_id, modality_id, general_list_itens };
    const oldData = await General_ListService.getGeneral_ListById(id);
    const updatedGeneral_List = await General_ListService.updateGeneral_List(id, General_ListData);

    if (!updatedGeneral_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldData, updatedGeneral_List, DB_TABLE, userId);
    return res.status(200).json(updatedGeneral_List);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line
const deleteGeneral_List = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletedGeneral_List = await General_ListService.deleteGeneral_List(
      id,
    );
    if (!deletedGeneral_List) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletedGeneral_List, DB_TABLE, userId);
    return res.status(200).json({ message: 'General List deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getGeneral_List,
  getGeneral_ListById,
  getGeneral_ListBySchool,
  getGeneral_ListByCycle,
  createGeneral_List,
  updateGeneral_List,
  deleteGeneral_List,
  updateGeneralListModalityAndListFood,
  getGeneralListByInepAndModality,
};

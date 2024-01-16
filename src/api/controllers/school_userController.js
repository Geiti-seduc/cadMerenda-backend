const school_userService = require('../services/school_userService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';
// const HTTP_STATUS_CREATED_SUCCESS_201 = 'Resource created successfully';

const DB_TABLE = 'School_User';

const getSchool_Users = async (req, res) => {
  try {
    const listSchool = await school_userService.getSchool_Users();
    return res.status(200).json(listSchool);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getSchool_UserById = async (req, res) => {
  try {
    const { id } = req.params;
    const school_user = await school_userService.getSchool_UserById(id);
    if (!school_user) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(school_user);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createSchool_User = async (req, res) => {
  try {
    const { userId } = req;
    const { role, school_inep, user_id } = req.body;
    const school_userData = { role, school_inep, user_id };
    const newSchool_User = await school_userService.createSchool_User(
      school_userData,
    );
    logsController.creationLog(newSchool_User, DB_TABLE, userId);
    return res.status(201).json(newSchool_User);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line max-lines-per-function
const updateSchool_User = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { role, school_inep, user_id } = req.body;
    const school_userData = { role, school_inep, user_id };
    const oldData = await school_userService.getSchool_UserById(id);
    const updatedSchool_User = await school_userService.updateSchool_User(
      id,
      school_userData,
    );
    if (!updatedSchool_User) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldData, updatedSchool_User, DB_TABLE, userId);
    return res.status(200).json(updatedSchool_User);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const deleteSchool_User = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletedSchool_User = await school_userService.deleteSchool_User(id);
    if (!deletedSchool_User) {
      return res.status(404).json({ message: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletedSchool_User, DB_TABLE, userId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getSchool_Users,
  getSchool_UserById,
  createSchool_User,
  updateSchool_User,
  deleteSchool_User,
};

const bcrypt = require('bcrypt');
const logsController = require('./logsController');
const userService = require('../services/userService');
const { getDate } = require('../../utils/dateUtils');

const DATA_TABLE = 'Users';

const ERR_SERVER = 'Internal server error';
const ERR_NOT_FOUND = 'User not found';

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    const usersSanitized = users.map((user) => {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser;
    });
    return res.status(200).json(usersSanitized);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInactiveUsers = async (req, res) => {
  try {
    const users = await userService.getInactiveUsers();
    const usersSanitized = users.map((user) => {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser;
    });
    return res.status(200).json(usersSanitized);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUserbyEmail(email);
    if (!user) {
      return res.status(404).json({ error: ERR_NOT_FOUND });
    }
    const { password, ...sanitizedUser } = user;
    return res.status(200).json(sanitizedUser);
  } catch (error) {
    return res.status(500).json({ error: ERR_SERVER });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserbyId(id);
    if (!user) {
      return res.status(404).json({ error: ERR_NOT_FOUND });
    }
    const { password, ...sanitizedUser } = user;
    return res.status(201).json(sanitizedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line max-lines-per-function
const createUserAndAssociateToSchool = async (req) => {
  try {
    const { id, email, name, password, role, schoolInep } = req.body;
  
    const requiredFields = [id, email, name, password, role, schoolInep];
  
    if (!requiredFields.every((field) => field)) {
      const errorMsg = { error: 'CPF, email, name, password, role, or schoolInep not informed' };
      console.log(errorMsg);
      return { status: 422, msg: errorMsg };
    }
  
    const lastLogin = getDate();
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    const userData = {
      id,
      email,
      name,
      password: hashedPassword,
      role,
      lastLogin,
    };
    const newUser = await userService.createUserAndAssociateToSchool(userData, schoolInep);

    if (!newUser) {
      const errorMsg = { error: ERR_SERVER };
      return { status: 404, msg: errorMsg };
    }
    return { status: 201, msg: newUser };
  } catch (error) {
    const errorMsg = { error: ERR_SERVER };
    return { status: 500, msg: errorMsg };
  }
};

// eslint-disable-next-line max-lines-per-function
const updateAndAssociateToSchool = async (req) => {
  const { id } = req.params;
  const { email, name, password, role, schoolInep } = req.body;

  const requiredFields = [id, email, name, password, role, schoolInep];
  if (!requiredFields.every((field) => field)) {
    const errorMsg = { error: 'CPF, email, name, password, role, or schoolInep not informed' };
    console.log(errorMsg);
    return { status: 422, msg: errorMsg };
  }

  const userData = { id, email, name, password, role };
  try {
    const updatedUser = await userService.updateAndAssociateToSchool(userData, schoolInep);

    if (!updatedUser) {
      const errorMsg = { error: ERR_SERVER };
      return { status: 404, msg: errorMsg };
    }

    return { status: 200, msg: updatedUser };
  } catch (error) {
    const errorMsg = { error: ERR_SERVER };
    return { status: 500, msg: errorMsg };
  }
};

// eslint-disable-next-line max-lines-per-function
const createUser = async (req, res) => {
  try {
    const { id, email, name, password, role, schoolInep } = req.body;
  
    const requiredFields = [id, email, name, password, role];
  
    if (!requiredFields.every((field) => field)) {
      return res.status(422).json({ error: 'CPF, email, name, password, or role not informed' });
    }
    if (schoolInep) {
      const data = await createUserAndAssociateToSchool(req);
      return res.status(data.status).json(data.msg);
    }
    
    const lastLogin = getDate();
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = {
      id,
      email,
      name,
      password: hashedPassword,
      role,
      lastLogin,
    };

    const newUser = await userService.createUser(userData);
    delete newUser.password;
    const sanitizedUser = newUser;
    return res.status(201).json(sanitizedUser);
  } catch (error) {
    return res.status(500).json({ error: ERR_SERVER });
  }
};

// eslint-disable-next-line max-lines-per-function
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { email, name, password, role, schoolInep } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userData = { email, name, hashedPassword, role };
    if (schoolInep) {
      const data = await createUserAndAssociateToSchool(req);
      return res.status(data.status).json(data.msg);
    }
    const oldUser = await userService.getUserbyId(id);
    const userUpdate = await userService.updateUser(id, userData);
    if (!userUpdate) {
      return res.status(404).json({ error: ERR_SERVER });
    }
    logsController.updateLog(oldUser, userUpdate, DATA_TABLE, userId);
    delete userUpdate.password;
    return res.status(200).json(userUpdate);
  } catch (error) {
    return res.status(500).json({ error: ERR_SERVER });
  }
};

const updateLogin = async (res, user_id) => {
  const lastLogin = getDate();
  const userData = { lastLogin };
  try {
    const userUpdate = await userService.updateUser(user_id, userData);
    if (!userUpdate) {
      return res.status(404).json({ error: ERR_SERVER });
    }
    const { password, ...sanitizedUser } = userUpdate;
    return res.status(200).json(sanitizedUser);
  } catch (error) {
    return res.status(500).json({ error: ERR_SERVER });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: ERR_NOT_FOUND });
    }
    logsController.deleteLog(deletedUser, DATA_TABLE, userId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  getInactiveUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  updateLogin,
  createUserAndAssociateToSchool,
  updateAndAssociateToSchool,
};

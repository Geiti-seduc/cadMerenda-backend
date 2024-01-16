const userService = require('../services/userService');

const ERR_SERVER = 'Internal server error';
const ERR_NOT_FOUND = 'User not found';

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getUserById = async (req, res) => {
    const { user_cpf } = req.params;
    try {
        const user = await userService.getUserbyId(user_cpf);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ error: ERR_NOT_FOUND });
          }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createUser = async (req, res) => {
    const { user_cpf, nome, senha, cargo, lastLogin } = req.body;
    const userData = {
        user_cpf,
        nome,
        senha,
        cargo,
        lastLogin,
    };
    try {
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateUser = async (req, res) => {
    const { user_cpf } = req.params;
    const { nome, senha, cargo, lastLogin } = req.body;
    const userData = { nome, senha, cargo, lastLogin };
    try {
        const userUpdate = await userService.updateUser(user_cpf, userData);
        if (userUpdate) {
            res.status(200).json(userUpdate);
        } else {
            res.status(404).json({ error: ERR_SERVER });
        }
    } catch (error) {
        res.status(500).json({ error: ERR_SERVER });
    }
};

const deleteUser = async (req, res) => {
    const { user_cpf } = req.params;
    try {
        const deletedUser = await userService.deleteUser(user_cpf);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: ERR_NOT_FOUND });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
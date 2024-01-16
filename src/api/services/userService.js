const User = require('../../database/models/userModel');

const getUsers = async () => {
    const users = await User.findAll();
    return users;
};

const getUserbyId = async (user_cpf) => {
    const user = await User.findByPk(user_cpf);
    return user;
};

const createUser = async (userData) => {
    const { user_cpf, nome, senha, cargo, lastLogin } = userData;
    const newUser = await User.create({ user_cpf, nome, senha, cargo, lastLogin });
     return newUser;
};

const updateUser = async (user_cpf, userData) => {
    const updatedUser = await User.findByPk(user_cpf);
    if (updatedUser) {
        await updatedUser.update(userData);
        return userData;
    }
    return null;
};

const deleteUser = async (user_cpf) => {
    const userDelete = await User.findByPk(user_cpf);
    if (userDelete) {
        await userDelete.destroy();
        return userDelete;
    }
};

module.exports = {
    getUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
};
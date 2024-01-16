const Exemple = require('../../database/models/userModel');

async function getExemple() {
  const exemples = await Exemple.findAll();
  return exemples;
}

async function getExempleById(id) {
  const user = await Exemple.findByPk(id);
  return user;
}

async function createExemple(name, password, cpf, is_admin) {
  const newUser = await Exemple.create({ name, password, cpf, is_admin });
  return newUser;
}

async function updateExemple(userData) {
const { id, name, cpf, is_admin } = userData;
  const user = await Exemple.findByPk(id);
  if (user) {
    user.name = name;
    user.cpf = cpf;
    user.is_admin = is_admin;
    await user.save();
    return user;
  }
}

async function deleteExemple(id) {
  const user = await Exemple.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
}

module.exports = {
  getExemple,
  getExempleById,
  createExemple,
  updateExemple,
  deleteExemple,
};

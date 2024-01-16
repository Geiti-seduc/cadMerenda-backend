const exempleService = require('../services/exempleService');

const ERR_SERVER = 'Internal server error';
const ERR_NOT_FOUND = 'User not found';

async function getExemple(req, res) {
  try {
    const exemples = await exempleService.getExemple();
    res.status(200).json(exemples);
  } catch (error) {
    res.status(500).json({ error: ERR_SERVER });
  }
}

async function getExempleById(req, res) {
  const { id } = req.params;
  try {
    const user = await exempleService.getExempleById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: ERR_NOT_FOUND });
    }
  } catch (error) {
    res.status(500).json({ error: ERR_SERVER });
  }
}

async function createExemple(req, res) {
  const { name, cpf, is_admin } = req.body;
  try {
    const newUser = await exempleService.createExemple(name, cpf, is_admin);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: ERR_SERVER });
  }
}

async function updateExemple(req, res) {
  const { id } = req.params;
  const { name, password, cpf, is_admin } = req.body;
  try {
    const updatedUser = await exempleService.updateExemple(id, name, password, cpf, is_admin);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: ERR_NOT_FOUND });
    }
  } catch (error) {
    res.status(500).json({ error: ERR_SERVER });
  }
}

async function deleteExemple(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await exempleService.deleteExemple(id);
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: ERR_NOT_FOUND });
    }
  } catch (error) {
    res.status(500).json({ error: ERR_SERVER });
  }
}

module.exports = {
  getExemple,
  getExempleById,
  createExemple,
  updateExemple,
  deleteExemple,
};

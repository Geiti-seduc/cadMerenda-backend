// src/api/controllers/userAndSchoolController.js
const userSchoolService = require('../services/userAndSchoolService');

const getAllUsersAndSchools = async (req, res) => {
  try {
    const userData = await userSchoolService.getAllUsersAndSchoolsData();
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsersAndSchools,
};

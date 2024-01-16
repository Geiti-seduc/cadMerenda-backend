const schoolAndAccessService = require('../services/schoolAndAccessService');

const getSchoolAndAccessData = async (req, res) => {
  try {
    const schoolAndAccessData = await schoolAndAccessService.getSchoolAndAccessData();
    return res.status(200).json(schoolAndAccessData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getSchoolAndAccessData,
};

const schoolAndSupplierService = require('../services/schoolAndSupplierService');

const getSchoolAndSupplierData = async (req, res) => {
  try {
    const schoolAndSupplierData = await schoolAndSupplierService.getSchoolAndSupplierData();
    return res.status(200).json(schoolAndSupplierData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getSchoolAndSupplierData,
};

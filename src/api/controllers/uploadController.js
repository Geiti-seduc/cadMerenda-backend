const uploadService = require('../services/uploadService');
const certificateController = require('./certificateController');

// 36.572.081/0001-41

const updateCertificate = async (req, res) => {
  const { userId } = req;
  const { archName, required_certificate_id } = req.params;
  const uploadedFile = req.file;
  if (!uploadedFile || !archName || !required_certificate_id) {
    return res.status(400).json({ error: 'Information missing.' });
  }
  try {
    uploadService.uploadCertificate(uploadedFile, userId, archName);
    certificateController.updateCertificate(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error saving the file.' });
  }
};

const createCertificate = async (req, res) => {
  const { userId } = req.params;
  const uploadedFile = req.file;
  const { name } = req.body;
  if (!uploadedFile || !userId) {
    return res.status(400).json({ error: 'Resource missing' });
  }
  try {
    uploadService.uploadCertificate(uploadedFile, userId, name);
    certificateController.createNewcertificate(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error saving the file.' });
  }
};

module.exports = {
  createCertificate,
  updateCertificate,
};

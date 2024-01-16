const path = require('path');
const certificateService = require('../services/certificateService');
const requiredCertificateService = require('../services/requiredCertificateService');
const logsController = require('./logsController');
const extractUserId = require('../../utils/extractUserId');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Certificate';

const getAllcertificate = async (req, res) => {
  try {
    const allcertificate = await certificateService.getCertificate();
    return res.status(200).json(allcertificate);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getcertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificateById = await certificateService.getCertificateById(id);
    if (!certificateById) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(certificateById);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createNewcertificate = async (req, res) => {
  try {
    const userId = extractUserId(req.params);
    const { expiration, name } = req.body;
    const archive = path.join(`${__dirname}/../../../certificates/${userId}`);
    const requiredCertificateId = await requiredCertificateService.getCertificateIdByName(name);
    if (!requiredCertificateId) return res.status(404).json({ error: 'Certificate not found' });

    const certificateData = { 
      required_certificate_id: requiredCertificateId, expiration, archive, user_id: userId, 
    };
    const newCertificate = await certificateService.createCertificate(certificateData);
    
    logsController.creationLog(newCertificate, DATA_TABLE, userId);
    return res.status(201).json(newCertificate);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line max-lines-per-function
const updateCertificate = async (req, res) => {
  try {
    const { required_certificate_id } = req.params;
    const { userId } = req;
    const { expiration } = req.body;
    const archive = path.join(`${__dirname}/../../../certificates/${userId}`);
    const certificate = await certificateService.getCertificateByRequiredCertificateId(
        required_certificate_id,
        userId,
      );
    if (!certificate) {
      const newCertificate = await certificateService.createCertificate({
        required_certificate_id,
        expiration,
        archive,
        user_id: userId,
      });
      logsController.creationLog(newCertificate, DATA_TABLE, userId);
      return res.status(200).json(newCertificate);
    }
    const certificateData = {
      id: certificate[0].id,
      user_id: userId,
      required_certificate_id,
      expiration,
      archive,
    };
    const oldCertificate = await certificateService.getCertificateById(
      certificate[0].id,
    );
    const updatedCertificate = await certificateService.updateCertificate(
      certificate[0].id,
      certificateData,
    );
    if (!updatedCertificate) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(
    oldCertificate,
    updatedCertificate,
    DATA_TABLE,
      userId,
    );
    return res.status(200).json(updatedCertificate);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const deletedcertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletecertificate = await certificateService.deletedCertificate(id);
    if (!deletecertificate) {
      return res.status(404).json({ error: 'Not possible to delete your certificate.' });
    }
    logsController.deleteLog(deletecertificate, DATA_TABLE, userId);
    return res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getAllcertificate,
  getcertificateById,
  createNewcertificate,
  updateCertificate,
  deletedcertificate,
};

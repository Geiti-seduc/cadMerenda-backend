/* eslint-disable */
// src/api/controllers/requiredCertificateController.js
const requiredCertificateService = require('../services/requiredCertificateService');

const getRequiredCertificate = async (req, res) => {
  try {
    const requiredCertificates = await requiredCertificateService.getRequiredCertificate();
    return res.status(200).json(requiredCertificates);
  } catch (error) {
    return res.status(500).json({ controler: error });
  }
};

const getRequiredCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredCertificate = await requiredCertificateService.getRequiredCertificateById(id);

    if (!requiredCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    return res.status(200).json(requiredCertificate);
  } catch (error) {
    return res.status(500).json({ controller: error });
  }
};

const createRequiredCertificate = async (req, res) => {
  try {
    const { name } = req.body;
    const newCertificate = await requiredCertificateService.createRequiredCertificate(name);
    return res.status(201).json({ message: 'Certificate created successfully', data: newCertificate });
  } catch (error) {
    return res.status(500).json({ controller: error });
  }
};

const updateRequiredCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCertificate = await requiredCertificateService.updateRequiredCertificate(id, name);
    if (!updatedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    return res.status(200).json({ message: 'Certificate updated successfully', data: updatedCertificate });
  } catch (error) {
    return res.status(500).json({ controller: error });
  }
};

const deleteRequiredCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCertificate = await requiredCertificateService.deleteRequiredCertificate(id);
    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    return res.status(200).json({ message: 'Certificate deleted successfully', data: deletedCertificate });
  } catch (error) {
    return res.status(500).json({ controller: error });
  }
};

const getRequiredCertificatesWithExpiration = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredCertificatesWithExpiration = await requiredCertificateService.getRequiredCertificatesWithExpiration(id);

    if (!requiredCertificatesWithExpiration) {
      return res.status(404).json({ message: 'No certificates with expiration found' });
    }
    return res.status(200).json(requiredCertificatesWithExpiration);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ controller: error });
  }
};

module.exports = {
  getRequiredCertificate,
  getRequiredCertificateById,
  createRequiredCertificate,
  updateRequiredCertificate,
  deleteRequiredCertificate,
  getRequiredCertificatesWithExpiration,
};

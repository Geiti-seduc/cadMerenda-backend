const supplierService = require('../services/supplierService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Suppliers';

const getAllSuppliers = async (req, res) => {
  try {
    const allSuppliers = await supplierService.getSuppliers();
    return res.status(200).json(allSuppliers);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSuppliersById = async (req, res) => {
  try {
    const { id } = req.params;
    const suppliersById = await supplierService.getSupplierById(id);
    if (!suppliersById) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(suppliersById);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSupplierByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const supplierByUserId = await supplierService.getSupplierByUserId(user_id);
    if (!supplierByUserId) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(supplierByUserId);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

// eslint-disable-next-line max-lines-per-function
const extractSupplier = (req) => {
  const {
    cnpj,
    nire,
    company_name,
    trade_name,
    state_registration,
    cnae,
    phone,
    email,
    tech_manager,
    status,
    user_id,
    address_id,
  } = req.body;
  return {
    cnpj,
    nire,
    company_name,
    trade_name,
    state_registration,
    cnae,
    phone,
    email,
    tech_manager,
    status,
    user_id,
    address_id,
  };
};

const createSupplier = async (req, res) => {
  const supplierData = extractSupplier(req);
  try {
    const newSupplier = await supplierService.createSupplier(supplierData);
    logsController.creationLog(newSupplier, DATA_TABLE, supplierData.user_id);
    return res.status(201).json(newSupplier);
  } catch (error) {
    return res.status(500).json( error );
  }
};

const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const supplierData = req.body;
  try {
    const oldSupplier = await supplierService.getSupplierById(id);
    const updatedSupplier = await supplierService.updateSupplier(
      id,
      supplierData,
    );
    if (!updatedSupplier) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldSupplier, updatedSupplier, DATA_TABLE, userId);
    return res.status(200).json(updatedSupplier);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const deletedSupplier = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const deleteSupplier = await supplierService.deleteSupplier(id);
    if (!deleteSupplier) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deleteSupplier, DATA_TABLE, userId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getAllSuppliers,
  getSuppliersById,
  createSupplier,
  updateSupplier,
  deletedSupplier,
  getSupplierByUserId,
};

const addressService = require('../services/addressService');
const logsController = require('./logsController');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';

const DATA_TABLE = 'Address';

const getAllAddress = async (req, res) => {
  try {
    const allAddress = await addressService.getAddress();
    return res.status(200).json(allAddress);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAddressById = async (req, res) => {
  try {
    const { address_id } = req.params;
    const addressById = await addressService.getAddressById(address_id);
    if (!addressById) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(addressById);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// eslint-disable-next-line max-lines-per-function
const extractData = (req) => {
  const {
    zip,
    street,
    number,
    complement,
    district,
    city,
    state,
    immediate_region,
    intermediate_region,
  } = req.body;
  return {
    zip,
    street,
    number,
    complement,
    district,
    city,
    state,
    immediate_region,
    intermediate_region,
  };
};

const createNewAddress = async (req, res) => {
  try {
    const { userId } = req;
    const addressData = extractData(req);
    const requiredFields = ['zip', 'street', 'number', 'district', 'city', 'state'];
    const requiredFieldsExists = requiredFields.every((field) => addressData[field]);
    if (!requiredFieldsExists) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
      const newAddress = await addressService.createAddress(addressData);
      logsController.creationLog(newAddress, DATA_TABLE, userId);
       return res.status(201).json({ id: newAddress.id, zip: newAddress.zip });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateAddress = async (req, res) => {
  try {
    const addressData = req.body;
    const { userId } = req;
    const { address_id } = req.params;
    const oldAddress = await addressService.getAddressById(address_id);
    const updatedAddress = await addressService.updateAddress(
      address_id,
      addressData,
    );
    logsController.updateLog(oldAddress, updatedAddress, DATA_TABLE, userId);
    return res.status(200).json(updatedAddress);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletedAddress = async (req, res) => {
  try {
    const { userId } = req;
    const { address_id } = req.params;
    const deleteAddress = await addressService.deletedAddress(address_id);
    if (!deleteAddress) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deleteAddress, DATA_TABLE, userId);
    return res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getAllAddress,
  getAddressById,
  createNewAddress,
  updateAddress,
  deletedAddress,
};

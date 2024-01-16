// src/api/controllers/schoolOfferController.js
const schoolOfferService = require('../services/schoolOfferService');

const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';
const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';

const getSchoolOffers = async (req, res) => {
  try {
    const { userId } = req;
    const schoolOffers = await schoolOfferService.getSchoolOffersByUserId(userId);
    if (!schoolOffers) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(schoolOffers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOfferFoodById = async (req, res) => {
  try {
    const { userId } = req;
    const { supplierId } = req.params;
    const offerFood = await schoolOfferService.getOfferFoodById(userId, supplierId);
    if (!offerFood) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(offerFood);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getSchoolOffers,
  getOfferFoodById,
};

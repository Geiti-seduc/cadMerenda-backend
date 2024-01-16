const express = require('express');
const loginRequired = require('../middleware/loginRequired');
const schoolOfferController = require('../controllers/schoolOfferController');

const getRoles = ['gestor', 'admin'];

const schoolOfferRouter = express.Router();

schoolOfferRouter.get('/', loginRequired(getRoles), schoolOfferController.getSchoolOffers);

schoolOfferRouter.get(
    '/:supplierId', loginRequired(getRoles), schoolOfferController.getOfferFoodById,
    );

module.exports = schoolOfferRouter;

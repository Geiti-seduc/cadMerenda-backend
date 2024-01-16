const express = require('express');
const loginRequired = require('../middleware/loginRequired');

const getRoles = ['fornecedor', 'nutricionista', 'gestor', 'admin'];
const postRoles = ['fornecedor'];
const putRoles = ['fornecedor'];
const delRoles = [''];

const Offer = express.Router();
const OfferController = require('../controllers/offerController');

Offer.get('/', loginRequired(getRoles), OfferController.getOffers);

Offer.get('/:id', loginRequired(getRoles), OfferController.getOfferById);

Offer.get(
  '/supplier/:id/:cycleId', // id do usuário fornecedor
  loginRequired(getRoles),
  OfferController.getOfferbySupplierId,
);

Offer.get(
  '/cycle/:cycle_id/:supplier_id',
  loginRequired(getRoles),
  OfferController.getOfferByCycle,
);

Offer.get(
  '/school/:school_inep/:supplier_id/:cycle_id',
  loginRequired(getRoles),
  OfferController.getOfferByInepAndSupplier,
);

Offer.post('/create', loginRequired(postRoles), OfferController.createOffer);

Offer.put('/:id', loginRequired(putRoles), OfferController.updateOffer);

Offer.delete('/:id', loginRequired(delRoles), OfferController.deleteOffer);

Offer.get(
  '/school/:inep/:cycle_id',
  loginRequired(getRoles),
  OfferController.getOffersByInep,
);

Offer.get(
  '/school/count/:inep/:cycleId/total',
  loginRequired(getRoles),
  OfferController.getCountOffersByInep,
);

Offer.get(
  '/supplier/:id/schools/:cycleId',
  loginRequired(getRoles),
  OfferController.getSchoolsFromSupplierOffer,
);

module.exports = Offer;
/* eslint-disable max-lines-per-function */
const OfferService = require('../services/offerService');
const logsController = require('./logsController');
const OfferedService = require('../services/offeredService');
const TotalOrderService = require('../services/total_OrderService');
const schoolService = require('../services/schoolService');

const HTTP_STATUS_SERVER_ERROR_500 = 'Internal server error';
const HTTP_STATUS_NOT_FOUND_ERROR_404 = 'Resource not found';
// const HTTP_STATUS_CREATED_SUCCESS_201 = 'Resource created successfully';

const DB_TABLE = 'Offer';

const getOffers = async (req, res) => {
  try {
    const listOffer = await OfferService.getOffers();
    return res.status(200).json(listOffer);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOfferByCycle = async (req, res) => {
  try {
    const { cycle_id, supplier_id } = req.params;
    const Offer = await OfferService.getOfferByCycle(cycle_id, supplier_id);
    if (!Offer) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Offer);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const Offer = await OfferService.getOfferById(id);
    if (!Offer) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Offer);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOfferByInepAndSupplier = async (req, res) => {
  try {
    const { school_inep, supplier_id, cycle_id } = req.params;
    const Offer = await OfferService.getOfferByInepAndSupplier(
      school_inep,
      supplier_id,
      cycle_id,
    );
    if (Offer) {
      return res.status(200).json(Offer);
    }
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const createOffer = async (req, res) => {
  try {
    const { userId } = req;
    const {
      total_price,
      supplier_id,
      cycle_id,
      offered_products,
      totalOrdersIds,
    } = req.body;
    const offerData = { total_price, supplier_id, cycle_id };

    const newOffer = await OfferService.createOffer(offerData);
    logsController.creationLog(newOffer, DB_TABLE, userId);

    const createOfferedItems = offered_products.map(async (item) => {
      const offeredData = {
        offer_id: newOffer.id,
        product_price: item.product_price,
        food_id: item.food_id,
        frequency: item.frequency,
        quantity: item.quantity,
        brand: item.brand,
      };
      await OfferedService.createOffered(offeredData);
      logsController.creationLog(offeredData, 'Offered_Products', userId);
      return offeredData;
    });

    const createTotalOrders = totalOrdersIds.map(async (order) => {
      const totalOrderData = { order_id: order, offer_id: newOffer.id };
      const totalOrder = await TotalOrderService.createTotalOrder(
        totalOrderData,
      );
      logsController.creationLog(totalOrderData, 'Total_Order', userId);
      return totalOrder;
    });

    const [offerItems, totalOrders] = await Promise.all([
      Promise.all(createOfferedItems),
      Promise.all(createTotalOrders),
    ]);

    return res.status(201).json({ newOffer, offerItems, totalOrders });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { total_price, supplier_id, cycle_id, offered_products } = req.body;
    const offerData = { total_price, supplier_id, cycle_id };

    const oldData = await OfferService.getOfferById(id);
    delete oldData.offered_products;

    const updatedOffer = await OfferService.updateOffer(id, offerData);

    if (!updatedOffer || !offered_products) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.updateLog(oldData, updatedOffer, DB_TABLE, userId);

    const updateOfferedProducts = await Promise.all(
      offered_products.map(async (item) => {
        const offeredData = {
          offer_id: updatedOffer.id,
          product_price: item.product_price,
          food_id: item.food_id,
          frequency: item.frequency,
          quantity: item.quantity,
          brand: item.brand,
        };

        const oldOfferedData = await OfferedService.getOfferedByFoodIdAndOfferId(offeredData);
        const updatedOfferedFood = await OfferedService.updateOfferedByFoodIdAndOfferId(
          offeredData,
          );
        logsController.updateLog(
          oldOfferedData,
          updatedOfferedFood,
          'Offered_Products',
          userId,
        );
        return updatedOfferedFood;
      }),
    );

    return res.status(200).json({ updatedOffer, offerItems: updateOfferedProducts });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const deletedOffer = await OfferService.deleteOffer(id);
    if (!deletedOffer) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    logsController.deleteLog(deletedOffer, DB_TABLE, userId);
    return res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOfferbySupplierId = async (req, res) => {
  try {
    const { id, cycleId } = req.params;
    const Offer = await OfferService.getOfferBySupplierId(id, cycleId);
    if (!Offer) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Offer);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getSchoolsFromSupplierOffer = async (req, res) => {
  try {
    const { id, cycleId } = req.params;
    const Schools = await OfferService.getSchoolsFromSupplierOffer(id, cycleId);
    if (!Schools) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    return res.status(200).json(Schools);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getCountOffersByInep = async (req, res) => {
  try {
    const { inep, cycleId } = req.params;
    const School = await schoolService.getSchoolById(inep);
    if (!School) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    const Offers = await OfferService.getCountOffersByInep(inep, cycleId);
    if (!Offers) {
      return res.status(200).json(0);
    }
    return res.status(200).json(Offers);
  } catch (error) {
    return res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

const getOffersByInep = async (req, res) => {
  try {
    const { inep, cycle_id } = req.params;
    const Offer = await OfferService.getOffersByInep(inep, cycle_id);
    if (!Offer) {
      return res.status(404).json({ error: HTTP_STATUS_NOT_FOUND_ERROR_404 });
    }
    res.status(200).json(Offer);
  } catch (error) {
    res.status(500).json({ error: HTTP_STATUS_SERVER_ERROR_500 });
  }
};

module.exports = {
  getOffers,
  getOfferById,
  getOfferbySupplierId,
  getOfferByInepAndSupplier,
  getOfferByCycle,
  getOffersByInep,
  getCountOffersByInep,
  getSchoolsFromSupplierOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};

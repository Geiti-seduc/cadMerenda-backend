/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const OfferService = require('../services/offerService');
const OfferedService = require('../services/offeredService');
const TotalOrderService = require('../services/total_OrderService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/offerService');
jest.mock('../services/offeredService');
jest.mock('../services/total_OrderService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockOffer = [
  {
    total_price: 220.35,
    order_id: '601',
    supplier_id: '101',
    cycle_id: '48624',
    offered_products: [
      {
        product_price: 210.1,
        food_id: '301',
        quantity: 10,
        brand: 'Boca de Pimenta',
      },
      {
        product_price: 573.04,
        food_id: '302',
        quantity: 100,
        brand: 'Boca de Pimenta 4.0 o retorno',
      },
    ],
    totalOrdersIds: [
      {
        id: '606',
      },
    ],
  },
  {
    newOffer: {
      total_price: 220.35,
      order_id: '601',
      supplier_id: '101',
      cycle_id: '48624',
      offered_products: [
        {
          brand: 'Boca de Pimenta',
          food_id: '301',
          product_price: 210.1,
          quantity: 10,
        },
        {
          brand: 'Boca de Pimenta 4.0 o retorno',
          food_id: '302',
          product_price: 573.04,
          quantity: 100,
        },
      ],
      totalOrdersIds: [
        {
          id: '606',
        },
      ],
    },
    offerItems: [
      {
        product_price: 210.1,
        food_id: '301',
        quantity: 10,
        brand: 'Boca de Pimenta',
      },
      {
        product_price: 573.04,
        food_id: '302',
        quantity: 100,
        brand: 'Boca de Pimenta 4.0 o retorno',
      },
    ],
    totalOrders: [
      {
        total_price: 220.35,
        order_id: '601',
        supplier_id: '101',
        cycle_id: '48624',
        offered_products: [
          {
            brand: 'Boca de Pimenta',
            food_id: '301',
            product_price: 210.1,
            quantity: 10,
          },
          {
            brand: 'Boca de Pimenta 4.0 o retorno',
            food_id: '302',
            product_price: 573.04,
            quantity: 100,
          },
        ],
        totalOrdersIds: [
          {
            id: '606',
          },
        ],
      },
    ],
  },
  {
    updatedOffer: {
      total_price: 220.35,
      order_id: '601',
      supplier_id: '101',
      cycle_id: '48624',
      totalOrdersIds: [
        {
          id: '606',
        },
      ],
    },
    offerItems: [
      {
        total_price: 220.35,
        order_id: '601',
        supplier_id: '101',
        cycle_id: '48624',
        totalOrdersIds: [
          {
            id: '606',
          },
        ],
      },
      null,
    ],
  },
];

describe('Offer Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOffer', () => {
    it('should return all offer', async () => {
      const expectedOffer = mockOffer;
      OfferService.getOffers.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getOffers.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('getOfferById', () => {
    it('should return an offer by id', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getOfferById.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getOfferById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      const expectedError = { error: 'Resource not found' };
      OfferService.getOfferById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/offer/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getOfferbySupplierId', () => {
    it('should return an offer by supplier id', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getOfferBySupplierId.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/supplier/10/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getOfferBySupplierId.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/supplier/10/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      const expectedError = { error: 'Resource not found' };
      OfferService.getOfferBySupplierId.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/offer/supplier/10/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getOfferByCycle', () => {
    it('should return an offer by cycle', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getOfferByCycle.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/cycle/48624/101')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getOfferByCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/cycle/48624/101')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      const expectedError = { error: 'Resource not found' };
      OfferService.getOfferByCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/offer/cycle/48624/101')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getOfferByInepAndSupplier', () => {
    it('should return an offer by inep and supplier', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getOfferByInepAndSupplier.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/school/27036731/101/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getOfferByInepAndSupplier.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/school/27036731/101/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('createOffer', () => {
    it('should create an offer', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.createOffer.mockResolvedValueOnce(expectedOffer);
      OfferedService.createOffered.mockResolvedValueOnce(expectedOffer);
      TotalOrderService.createTotalOrder.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .post('/offer/create')
        .set('Authorization', `Bearer ${token}`)
        .send(expectedOffer);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockOffer[1]);
    });

    it(TESTING_ERROR, async () => {
      OfferService.createOffer.mockRejectedValueOnce(error);

      const response = await request(app)
        .post('/offer/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockOffer[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('updateOffer', () => {
    it('should update an offer', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.updateOffer.mockResolvedValueOnce(expectedOffer);
      OfferService.getOfferById.mockResolvedValueOnce(expectedOffer);
      OfferedService.getOfferedByFoodIdAndOfferId.mockResolvedValueOnce(expectedOffer);
      OfferedService.updateOfferedByFoodIdAndOfferId.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .put('/offer/10')
        .set('Authorization', `Bearer ${token}`)
        .send(expectedOffer);

      console.log(response.body);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockOffer[2]);
    });

    it(TESTING_ERROR, async () => {
      OfferService.updateOffer.mockRejectedValueOnce(error);

      const response = await request(app)
        .put('/offer/10')
        .set('Authorization', `Bearer ${token}`)
        .send(mockOffer[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('deleteOffer', () => {
    it('should delete an offer', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.deleteOffer.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .delete('/offer/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Offer deleted successfully' });
    });

    it(TESTING_ERROR, async () => {
      OfferService.deleteOffer.mockRejectedValueOnce(error);

      const response = await request(app)
        .delete('/offer/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      const expectedError = { error: 'Resource not found' };
      OfferService.deleteOffer.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/offer/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getOffersByInep', () => {
    it('should return an offer by inep', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getOffersByInep.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/school/27036731/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getOffersByInep.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/school/27036731/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      const expectedError = { error: 'Resource not found' };
      OfferService.getOffersByInep.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/offer/school/27036731/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getCountOffersByInep', () => {
    it('should return an offer by inep', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getCountOffersByInep.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/school/count/27036731/48624/total')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getCountOffersByInep.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/school/count/27036731/48624/total')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      OfferService.getCountOffersByInep.mockResolvedValueOnce([]);

      const response = await request(app)
        .get('/offer/school/count/27036731/48624/total')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('getSchoolsFromSupplierOffer', () => {
    it('should return an offer by inep', async () => {
      const expectedOffer = mockOffer[0];
      OfferService.getSchoolsFromSupplierOffer.mockResolvedValueOnce(expectedOffer);

      const response = await request(app)
        .get('/offer/supplier/10/schools/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOffer);
    });

    it(TESTING_ERROR, async () => {
      OfferService.getSchoolsFromSupplierOffer.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/offer/supplier/10/schools/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if offer not found', async () => {
      OfferService.getSchoolsFromSupplierOffer.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/offer/supplier/10/schools/48624')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Resource not found' });
    });
  });
});

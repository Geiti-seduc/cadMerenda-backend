/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const orderService = require('../services/orderService');
const requestedService = require('../services/requestedService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/orderService');
jest.mock('../services/requestedService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    // criar funções simuladas
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockOrder = [
  {
    school_inep: '27036960',
    cycle_id: '48624',
    general_list_id: '701',
    requested_products: [
      {
        food_id: '301',
        quantity: 10,
      },
      {
        food_id: '302',
        quantity: 100,
      },
    ],
  },
  {
    id: '11',
    school_inep: '12345678',
    cycle_id: '2',
  },
  {
    school_inep: '27036960',
    cycle_id: '48624',
    general_list_id: '701',
    requested_products: [
      {
        food_id: '301',
        quantity: 10,
      },
      {
        food_id: '302',
        quantity: 100,
      },
    ],
  },
  {
    newOrder: {
      school_inep: '27036960',
      cycle_id: '48624',
      general_list_id: '701',
      requested_products: [
        {
          food_id: '301',
          quantity: 10,
        },
        {
          food_id: '302',
          quantity: 100,
        },
      ],
    },
    requestedProducts: [
      { food_id: '301', quantity: 10 },
      { food_id: '302', quantity: 100 },
    ],
  },
  {
    updatedOrder: {
      school_inep: '27036960',
      cycle_id: '48624',
      general_list_id: '701',
    },
    requestedProductsModified: [null, null],
  },
];

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOrder', () => {
    it('should return all order', async () => {
      const expectedOrder = mockOrder;
      orderService.getOrders.mockResolvedValueOnce(expectedOrder); // método que define o valor retornado pela função simulada quando ela é chamada

      const response = await request(app)
        .get('/order')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOrder);
    });

    it(TESTING_ERROR, async () => {
      orderService.getOrders.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/order')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const expectedOrder = mockOrder[2];
      orderService.getOrderById.mockResolvedValueOnce(expectedOrder);

      const response = await request(app)
        .get('/order/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOrder);
    });

    it(TESTING_ERROR, async () => {
      orderService.getOrderById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/order/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error when order not found', async () => {
      orderService.getOrderById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/order/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Resource not found' });
    });
  });

  describe('getOrderBySchool', () => {
    it('should return an order by school', async () => {
      const expectedOrder = mockOrder[2];
      orderService.getOrderBySchool.mockResolvedValueOnce(expectedOrder);

      const response = await request(app)
        .get('/order/school/12345678')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOrder);
    });

    it(TESTING_ERROR, async () => {
      orderService.getOrderBySchool.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/order/school/12345678')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error when order not found', async () => {
      orderService.getOrderBySchool.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/order/school/12345678')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Resource not found' });
    });
  });

  describe('getOrderBySchoolAndCycle', () => {
    it('should return an order by school and cycle', async () => {
      const expectedOrder = mockOrder[2];
      orderService.getOrderBySchoolAndCycle.mockResolvedValueOnce(expectedOrder);

      const response = await request(app)
        .get('/order/school/12345678/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOrder);
    });

    it(TESTING_ERROR, async () => {
      orderService.getOrderBySchoolAndCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/order/school/12345678/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error when order not found', async () => {
      orderService.getOrderBySchoolAndCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/order/school/12345678/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Resource not found' });
    });
  });

  describe('getTotalOrder', () => {
    it('should return an order by school and cycle', async () => {
      const expectedOrder = mockOrder[2];
      orderService.getTotalOrder.mockResolvedValueOnce(expectedOrder);

      const response = await request(app)
        .get('/order/school/12345678/1/total')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedOrder);
    });

    it(TESTING_ERROR, async () => {
      orderService.getTotalOrder.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/order/school/12345678/1/total')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error when order not found', async () => {
      orderService.getTotalOrder.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/order/school/12345678/1/total')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Resource not found' });
    });
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const expectedOrder = mockOrder[0];
      orderService.createOrder.mockResolvedValueOnce(expectedOrder);
      requestedService.createRequested.mockResolvedValueOnce(expectedOrder);

      const response = await request(app)
        .post('/order/create')
        .set('Authorization', `Bearer ${token}`)
        .send(expectedOrder);

      console.log(response.body);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockOrder[3]);
    });

    it(TESTING_ERROR, async () => {
      orderService.createOrder.mockRejectedValueOnce(error);

      const response = await request(app)
        .post('/order/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockOrder[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

    describe('updateOrder', () => {
        it('should update an order', async () => {
        const expectedOrder = mockOrder[0];
        orderService.getOrderById.mockResolvedValueOnce(expectedOrder);
        orderService.updateOrder.mockResolvedValueOnce(expectedOrder);
        requestedService.getRequestedByFoodId.mockResolvedValueOnce(expectedOrder);
        requestedService.updateRequested.mockResolvedValueOnce(expectedOrder);
    
        const response = await request(app)
            .put('/order/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedOrder);

        console.log(response.body);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockOrder[4]);
        });
    
        it(TESTING_ERROR, async () => {
        orderService.updateOrder.mockRejectedValueOnce(error);
    
        const response = await request(app)
            .put('/order/10')
            .set('Authorization', `Bearer ${token}`)
            .send(mockOrder[0]);
    
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(error);
        });
    });

    describe('deleteOrder', () => {
        it('should delete an order', async () => {
        const expectedOrder = mockOrder[0];
        orderService.getOrderById.mockResolvedValueOnce(expectedOrder);
        orderService.deleteOrder.mockResolvedValueOnce(expectedOrder);
    
        const response = await request(app)
            .delete('/order/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedOrder);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Order deleted successfully' });
        });
    
        it(TESTING_ERROR, async () => {
        orderService.deleteOrder.mockRejectedValueOnce(error);
    
        const response = await request(app)
            .delete('/order/10')
            .set('Authorization', `Bearer ${token}`)
            .send(mockOrder[0]);
    
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(error);
        });
    });
});

/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const cycleService = require('../services/cycleService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/cycleService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';

const mockCycle = [
  {
    id: '10',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    startNutri: '2024-01-03T12:33:14.659Z',
    deadlineNutri: '2024-01-03T12:33:14.659Z',
    startSchool: '2024-01-03T12:33:14.659Z',
    deadlineSchool: '2024-01-03T12:33:14.659Z',
    startSupplier: '2024-01-03T12:33:14.659Z',
    deadlineSupplier: '2024-01-03T12:33:14.659Z',
    initSelectSupplier: '2024-01-03T12:33:14.659Z',
    deadlineSelectSupplier: '2024-01-03T12:33:14.659Z',
    createdAt: '2024-01-03T12:33:14.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
  },
  {
    id: '11',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    startNutri: '2024-01-03T12:33:14.659Z',
    deadlineNutri: '2024-01-03T12:33:14.659Z',
    startSchool: '2024-01-03T12:33:14.659Z',
    deadlineSchool: '2024-01-03T12:33:14.659Z',
    startSupplier: '2024-01-03T12:33:14.659Z',
    deadlineSupplier: '2024-01-03T12:33:14.659Z',
    initSelectSupplier: '2024-01-03T12:33:14.659Z',
    deadlineSelectSupplier: '2024-01-03T12:33:14.659Z',
    createdAt: '2024-01-03T12:33:14.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
  },
];

describe('Cycle Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCycles', () => {
    it('should return all cycles', async () => {
      const expectedCycle = mockCycle;
      cycleService.getCycles.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .get('/cycle')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.getCycles).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.getCycles.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/cycle')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.getCycles).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCycleById', () => {
    it('should return a cycle by id', async () => {
      const expectedCycle = mockCycle[0];
      cycleService.getCycleById.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .get('/cycle/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.getCycleById).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.getCycleById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/cycle/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.getCycleById).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line sonarjs/no-duplicate-string
    it('should return an error if cycle not found', async () => {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      const expectedError = { error: 'Cycle not found' };
      cycleService.getCycleById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/cycle/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getLastCycle', () => {
    it('should return the last cycle', async () => {
      const expectedCycle = mockCycle[0];
      cycleService.getLastCycle.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .get('/cycle/last/desc')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.getLastCycle).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.getLastCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/cycle/last/desc')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.getLastCycle).toHaveBeenCalledTimes(1);
    });

    it('should return an error if cycle not found', async () => {
      const expectedError = { error: 'Cycle not found' };
      cycleService.getLastCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/cycle/last/desc')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getLastPendingCycle', () => {
    it('should return the last pending cycle', async () => {
      const expectedCycle = mockCycle[0];
      cycleService.getLastPendingCycle.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .get('/cycle/last/pending')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.getLastPendingCycle).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.getLastPendingCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/cycle/last/pending')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.getLastPendingCycle).toHaveBeenCalledTimes(1);
    });

    it('should return an error if cycle not found', async () => {
      const expectedError = { error: 'Cycle not found' };
      cycleService.getLastPendingCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/cycle/last/pending')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('createCycle', () => {
    it('should create a new cycle', async () => {
      const expectedCycle = mockCycle[1];
      cycleService.createCycle.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .post('/cycle/create')
        .set('Authorization', `Bearer ${token}`)
        .send(expectedCycle);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.createCycle).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.createCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .post('/cycle/create')
        .set('Authorization', `Bearer ${token}`)
        .send(mockCycle[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.createCycle).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateCycle', () => {
    it('should update a cycle', async () => {
      const expectedCycle = mockCycle[1];
      cycleService.updateCycle.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .put('/cycle/10')
        .set('Authorization', `Bearer ${token}`)
        .send(expectedCycle);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.updateCycle).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.updateCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .put('/cycle/10')
        .set('Authorization', `Bearer ${token}`)
        .send(mockCycle[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.updateCycle).toHaveBeenCalledTimes(1);
    });

    it('should return an error if cycle not found', async () => {
      const expectedError = { error: 'Cycle not found' };
      cycleService.updateCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/cycle/10')
        .set('Authorization', `Bearer ${token}`)
        .send(mockCycle[0]);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('deleteCycle', () => {
    it('should delete a cycle', async () => {
      const expectedCycle = mockCycle[1];
      cycleService.deleteCycle.mockResolvedValueOnce(expectedCycle);

      const response = await request(app)
        .delete('/cycle/11')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCycle);
      expect(cycleService.deleteCycle).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      cycleService.deleteCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .delete('/cycle/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(cycleService.deleteCycle).toHaveBeenCalledTimes(1);
    });

    it('should return an error if cycle not found', async () => {
      const expectedError = { error: 'Cycle not found' };
      cycleService.deleteCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/cycle/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });
});

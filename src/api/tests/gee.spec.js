/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const geeService = require('../services/geeService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/geeService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockGEE = [
  {
    id: '1',
    name: 'Escola A',
    address_id: '1',
    school_inep: '11111111',
  },
  {
    id: '2',
    name: 'Escola B',
    address_id: '2',
    school_inep: '22222222',
  },
];

describe('GEE Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGEE', () => {
    it('should return all GEE', async () => {
      const expectedGEE = mockGEE;
      geeService.getGEE.mockResolvedValueOnce(expectedGEE);

      const response = await request(app)
        .get('/gee')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGEE);
    });

    it(TESTING_ERROR, async () => {
      geeService.getGEE.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/gee')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('getGEEById', () => {
    it('should return a GEE', async () => {
      const expectedGEE = mockGEE[0];
      geeService.getGEEById.mockResolvedValueOnce(expectedGEE);

      const response = await request(app)
        .get('/gee/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual(expectedGEE);
    });

    it(TESTING_ERROR, async () => {
      geeService.getGEEById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/gee/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if GEE not found', async () => {
      const expectedError = { error: 'Resource not found' };
      geeService.getGEEById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/gee/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('createGEE', () => {
    it('should create a GEE', async () => {
      const expectedGEE = mockGEE[0];
      geeService.createGEE.mockResolvedValueOnce(expectedGEE);

      const response = await request(app)
        .post('/gee/post')
        .send(expectedGEE)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual(expectedGEE);
    });

    it(TESTING_ERROR, async () => {
      geeService.createGEE.mockRejectedValueOnce(error);
      const expectedGEE = mockGEE[0];

      const response = await request(app)
        .post('/gee/post')
        .send(expectedGEE)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if missing data', async () => {
      const expectedError = { error: 'Missing data' };
      geeService.createGEE.mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/gee/post')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('updateGEE', () => {
    it('should update a GEE', async () => {
      const expectedGEE = mockGEE[0];
      geeService.updateGEE.mockResolvedValueOnce(expectedGEE);

      const response = await request(app)
        .put('/gee/1')
        .send(expectedGEE)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGEE);
    });

    it(TESTING_ERROR, async () => {
      geeService.updateGEE.mockRejectedValueOnce(error);
      const expectedGEE = mockGEE[0];

      const response = await request(app)
        .put('/gee/1')
        .send(expectedGEE)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if GEE not found', async () => {
      const expectedError = { error: 'Resource not found' };
      geeService.updateGEE.mockResolvedValueOnce(null);
      const expectedGEE = mockGEE[0];

      const response = await request(app)
        .put('/gee/1')
        .send(expectedGEE)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('deleteGEE', () => {
    it('should delete a GEE', async () => {
      const expectedGEE = mockGEE[0];
      geeService.deleteGEE.mockResolvedValueOnce(expectedGEE);

      const response = await request(app)
        .delete('/gee/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        message: 'GEE deleted successfully',
      });
    });

    it(TESTING_ERROR, async () => {
      geeService.deleteGEE.mockRejectedValueOnce(error);

      const response = await request(app)
        .delete('/gee/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if GEE not found', async () => {
      const expectedError = { error: 'Resource not found' };
      geeService.deleteGEE.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/gee/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });
});

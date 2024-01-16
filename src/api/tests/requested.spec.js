/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const requestedService = require('../services/requestedService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

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
const mockRequest = [
  {
    quantity: '2',
    order_id: '1',
    food_id: '1',
    frequency: '1',
    createdAt: '2024-01-03T12:33:14.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
  },
  {
    quantity: '2',
    order_id: '1',
    food_id: '1',
    frequency: '1',
    createdAt: '2024-01-03T12:33:14.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
  },
];

describe('Requested Controller', () => {
    describe('getAllRequested', () => {
        it('should return all requested', async () => {
            const expectedRequested = mockRequest;
            requestedService.getRequested.mockResolvedValueOnce(expectedRequested);

            const response = await request(app)
                .get('/requested')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedRequested);
        });

        it(TESTING_ERROR, async () => {
            requestedService.getRequested.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/requested')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getRequestedById', () => {
        it('should return requested by id', async () => {
            const expectedRequested = mockRequest[0];
            requestedService.getRequestedById.mockResolvedValueOnce(expectedRequested);

            const response = await request(app)
                .get('/requested/1')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedRequested);
        });

        it(TESTING_ERROR, async () => {
            requestedService.getRequestedById.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/requested/1')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return not found', async () => {
            requestedService.getRequestedById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/requested/2')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ error: 'Resource not found' });
        });
    });

    describe('createRequested', () => {
        it('should create a requested', async () => {
            const expectedRequested = mockRequest[0];
            requestedService.createRequested.mockResolvedValueOnce(expectedRequested);

            const response = await request(app)
                .post('/requested')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedRequested);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(expectedRequested);
        });

        it(TESTING_ERROR, async () => {
            requestedService.createRequested.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/requested')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('updateRequested', () => {
        it('should update a requested', async () => {
            const expectedRequested = mockRequest[0];
            const id = 1;
            requestedService.updateRequested.mockResolvedValueOnce(expectedRequested);

            const response = await request(app)
                .put(`/requested/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(expectedRequested);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedRequested);
        });

        it(TESTING_ERROR, async () => {
            requestedService.updateRequested.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/requested/1')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return not found', async () => {
            requestedService.updateRequested.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/requested/2')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ message: 'Resource not found' });
        });
    });

    describe('deleteRequested', () => {
        it('should delete a requested', async () => {
            const expectedRequested = { message: 'Resource deleted successfully' };
            requestedService.deleteRequested.mockResolvedValueOnce(expectedRequested);

            const response = await request(app)
                .delete('/requested/1')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: 'Requested deleted successfully' });
        });

        it(TESTING_ERROR, async () => {
            requestedService.deleteRequested.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/requested/1')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return not found', async () => {
            requestedService.deleteRequested.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/requested/2')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ message: 'Resource not found' });
        });
    });
});
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const modalityService = require('../services/modalityService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
  }));

jest.mock('../services/modalityService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockModality = [
    {
        id: '10',
        name: 'Teste',
        description: 'Teste',
    },
];

describe('Modality Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllModality', () => {
        it('should return all modality', async () => {
            const expectedModality = mockModality;
            modalityService.getModalities.mockResolvedValueOnce(expectedModality);

            const response = await request(app)
                .get('/modality')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedModality);
        });

        it(TESTING_ERROR, async () => {
            modalityService.getModalities.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/modality')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getModalityById', () => {
        it('should return a modality by id', async () => {
            const expectedModality = mockModality[0];
            modalityService.getModalityById.mockResolvedValueOnce(expectedModality);

            const response = await request(app)
                .get('/modality/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(expectedModality);
        });

        it(TESTING_ERROR, async () => {
            modalityService.getModalityById.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/modality/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if modality not found', async () => {
            const expectedError = { error: 'Resource not found' };
            modalityService.getModalityById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/modality/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('createModality', () => {
        it('should create a new modality', async () => {
            const newModality = mockModality[0];
            const id = { id: mockModality[0].id };
            modalityService.createModality.mockResolvedValueOnce(id);

            const response = await request(app)
                .post('/modality')
                .set('Authorization', `Bearer ${token}`)
                .send(newModality);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(id);
            expect(modalityService.createModality).toHaveBeenCalledTimes(1);
        });

        it(TESTING_ERROR, async () => {
            modalityService.createModality.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/modality')
                .set('Authorization', `Bearer ${token}`)
                .send(mockModality[0]);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('updateModality', () => {
        it('should update a modality', async () => {
            const upModality = mockModality[0];
            const id = { id: mockModality[0].id };
            modalityService.updateModality.mockResolvedValueOnce(id);

            const response = await request(app)
                .put('/modality/10')
                .set('Authorization', `Bearer ${token}`)
                .send(upModality);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(id);
            expect(modalityService.updateModality).toHaveBeenCalledTimes(1);
        });

        it(TESTING_ERROR, async () => {
            modalityService.updateModality.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/modality/10')
                .set('Authorization', `Bearer ${token}`)
                .send(mockModality[0]);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if modality not found', async () => {
            const expectedError = { error: 'Resource not found' };
            modalityService.updateModality.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/modality/10')
                .set('Authorization', `Bearer ${token}`)
                .send(mockModality[0]);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('deleteModality', () => {
        it('should delete a modality', async () => {
            const expectedModality = mockModality[0];
            modalityService.deleteModality.mockResolvedValueOnce(expectedModality);

            const response = await request(app)
                .delete('/modality/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: 'Modality deleted successfully' });
            expect(modalityService.deleteModality).toHaveBeenCalledTimes(1);
        });

        it(TESTING_ERROR, async () => {
            modalityService.deleteModality.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/modality/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if modality not found', async () => {
            const expectedError = { error: 'Resource not found' };
            modalityService.deleteModality.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/modality/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });
});
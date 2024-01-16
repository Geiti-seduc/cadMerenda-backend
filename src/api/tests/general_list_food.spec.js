/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const general_list_foodService = require('../services/general_list_foodService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/general_list_foodService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockGeneral_List_Food = [
    {
        id: '10',
        food_id: '1',
        general_list_id: '1',
    },
    {
        food_id: '1',
        general_list_id: '1',
    },
]; 

describe('General List Food Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getgeneral_list_food', () => {
        it('should return all general_list_food', async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            // eslint-disable-next-line max-len
            general_list_foodService.getgeneral_list_food.mockResolvedValueOnce(expectedGeneral_List_Food);

            const response = await request(app)
                .get('/general_list_food')
                .set('authorization', token);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expectedGeneral_List_Food);
        });

        it(TESTING_ERROR, async () => {
            general_list_foodService.getgeneral_list_food.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/general_list_food')
                .set('authorization', token);

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getgeneral_list_foodById', () => {
        it('should return general_list_food by id', async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(expectedGeneral_List_Food);

            const response = await request(app)
                // eslint-disable-next-line sonarjs/no-duplicate-string
                .get('/general_list_food/10')
                .set('authorization', token);

            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual(expectedGeneral_List_Food);
        });

        it(TESTING_ERROR, async () => {
            general_list_foodService.getgeneral_list_foodById.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/general_list_food/10')
                .set('authorization', token);

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if general_list_food not found', async () => {
            const expectedError = { error: 'Resource not found' };
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/general_list_food/10')
                .set('authorization', token);

            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('creategeneral_list_food', () => {
        it('should create a new general_list_food', async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.creategeneral_list_food.mockResolvedValueOnce(expectedGeneral_List_Food);

            const response = await request(app)
                .post('/general_list_food/post')
                .set('authorization', token)
                .send(expectedGeneral_List_Food);

            expect(response.statusCode).toEqual(201);
            expect(response.body).toEqual(expectedGeneral_List_Food);
        });

        it(TESTING_ERROR, async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.creategeneral_list_food.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/general_list_food/post')
                .set('authorization', token)
                .send(expectedGeneral_List_Food);

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if missing required data', async () => {
            const expectedError = { error: 'Missing required data' };

            const response = await request(app)
                .post('/general_list_food/post')
                .set('authorization', token);

            expect(response.statusCode).toEqual(400);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('updategeneral_list_food', () => {
        it('should update general_list_food', async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(expectedGeneral_List_Food);
            general_list_foodService.updategeneral_list_food.mockResolvedValueOnce(expectedGeneral_List_Food);

            const response = await request(app)
                .put('/general_list_food/10')
                .set('authorization', token)
                .send(expectedGeneral_List_Food);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expectedGeneral_List_Food);
        });

        it(TESTING_ERROR, async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(expectedGeneral_List_Food);
            general_list_foodService.updategeneral_list_food.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/general_list_food/10')
                .set('authorization', token)
                .send(expectedGeneral_List_Food);

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if general_list_food not found', async () => {
            const expectedError = { error: 'Resource not found' };
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/general_list_food/10')
                .set('authorization', token)
                .send(expectedGeneral_List_Food);

            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('deletegeneral_list_food', () => {
        it('should delete general_list_food', async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(expectedGeneral_List_Food);
            general_list_foodService.deletegeneral_list_food.mockResolvedValueOnce(expectedGeneral_List_Food);

            const response = await request(app)
                .delete('/general_list_food/10')
                .set('authorization', token);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ message: 'general_list_food deleted successfully' });
        });

        it(TESTING_ERROR, async () => {
            const expectedGeneral_List_Food = mockGeneral_List_Food[0];
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(expectedGeneral_List_Food);
            general_list_foodService.deletegeneral_list_food.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/general_list_food/10')
                .set('authorization', token);

            expect(response.statusCode).toEqual(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if general_list_food not found', async () => {
            const expectedError = { error: 'Resource not found' };
            general_list_foodService.getgeneral_list_foodById.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/general_list_food/10')
                .set('authorization', token);

            expect(response.statusCode).toEqual(404);
            expect(response.body).toEqual(expectedError);
        });
    });
});
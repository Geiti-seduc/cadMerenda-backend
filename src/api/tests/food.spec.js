/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const foodService = require('../services/foodService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/foodService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockFood = [
    {
        id: '10',
        name: 'Arroz',
        description: 'Arroz branco',
        measure: 'g',
        category: 'cereal',
        nmc: 10063090,
    },
    {
        name: 'Arroz',
        description: 'Arroz',
        measure: 'g',
        category: 'cereal',
        nmc: 10063090,
    },
    {
        id: '10',
        name: 'Arroz',
        description: 'Arroz branco',
        measure: 'g',
        category: 'cereal',
        nmc: 'aaaaaaaa',
    },
];

describe('Food Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllFood', () => {
        it('should return all food', async () => {
            const expectedFood = mockFood;
            foodService.getAllFood.mockResolvedValueOnce(expectedFood);

            const response = await request(app)
                .get('/food')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedFood);
        });

        it(TESTING_ERROR, async () => {
            foodService.getAllFood.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/food')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getFoodById', () => {
        it('should return a food by id', async () => {
            const expectedFood = mockFood[0];
            foodService.getFoodById.mockResolvedValueOnce(expectedFood);

            const response = await request(app)
                .get('/food/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedFood);
        });

        it(TESTING_ERROR, async () => {
            foodService.getFoodById.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/food/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if food not found', async () => {
            const expectedError = { error: 'Resource not found' };
            foodService.getFoodById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/food/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('createFood', () => {
        it('should create a food', async () => {
            const expectedFood = mockFood[0];
            foodService.createFood.mockResolvedValueOnce(expectedFood);

            const response = await request(app)
                .post('/food')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedFood);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(expectedFood);
        });

        it(TESTING_ERROR, async () => {
            foodService.createFood.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/food')
                .set('Authorization', `Bearer ${token}`)
                .send(mockFood[0]);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
        
        it('should return an error if nmc is not a number', async () => {
            const expectedError = { error: 'O campo nmc deve ser um número inteiro.' };
            const food = mockFood[2];

            const response = await request(app)
                .post('/food')
                .set('Authorization', `Bearer ${token}`)
                .send(food);

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('updateFood', () => {
        it('should update a food', async () => {
            const expectedFood = mockFood[0];
            foodService.updateFood.mockResolvedValueOnce(expectedFood);

            const response = await request(app)
                .put('/food/10')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedFood);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedFood);
        });

        it(TESTING_ERROR, async () => {
            foodService.updateFood.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/food/10')
                .set('Authorization', `Bearer ${token}`)
                .send(mockFood[0]);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if food not found', async () => {
            const expectedError = { message: 'Resource not found' };
            foodService.updateFood.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/food/10')
                .set('Authorization', `Bearer ${token}`)
                .send(mockFood[0]);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });

        it('should return an error if any field is not informed', async () => {
            const expectedError = { error: 'Todos os campos são obrigatórios.' };

            const response = await request(app)
                .put('/food/10')
                .set('Authorization', `Bearer ${token}`)
                .send({});

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('deleteFood', () => {
        it('should delete a food', async () => {
            const expectedFood = { message: 'Food deleted successfully' };
            foodService.deleteFood.mockResolvedValueOnce(expectedFood);

            const response = await request(app)
                .delete('/food/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedFood);
        });

        it(TESTING_ERROR, async () => {
            foodService.deleteFood.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/food/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if food not found', async () => {
            const expectedError = { error: 'Resource not found' };
            foodService.deleteFood.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/food/10')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });
});

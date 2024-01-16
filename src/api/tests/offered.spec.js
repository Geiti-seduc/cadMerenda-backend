/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const offeredProductsService = require('../services/offeredService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/offeredService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const errorMessage = { message: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockOfferedProducts = [

    {
        id: '453333',
        quantity: '300',
        frequency: 'Diário',
        product_price: '18.5',
        offer_id: '3333',
        food_id: '333',
        createdAt: '2024-01-05T15:48:22.474Z',
        updatedAt: '2024-01-05T15:48:22.474Z',
        brand: 'fila',

    },
    {
        id: '453323',
        quantity: '30',
        frequency: 'Semanal',
        product_price: '10.5',
        offer_id: '3223',
        food_id: '203',
        createdAt: '2024-01-05T15:48:22.474Z',
        updatedAt: '2024-01-05T15:48:22.474Z',
        brand: 'Vans',
    },
];

describe('Offered Products Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getOffered', () => {
        it('should return all offered products', async () => {
            const expectedProducts = mockOfferedProducts;
            offeredProductsService.getOffered.mockResolvedValueOnce(expectedProducts);

            const response = await request(app)
                .get('/offered')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedProducts);
        });

        it(TESTING_ERROR, async () => {
            offeredProductsService.getOffered.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/offered')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getOfferedById', () => {
        it('should return a product by id', async () => {
            const expectedProduct = mockOfferedProducts[0];
            offeredProductsService.getOfferedById.mockResolvedValueOnce(expectedProduct);
            
            const response = await request(app)
                .get('/offered/453333')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedProduct);
        });

        it('should return a error if product not found', async () => {
            const expectedProduct = { error: 'Resource not found' };
            offeredProductsService.getOfferedById.mockResolvedValueOnce(null);
            
            const response = await request(app)
                .get('/offered/452333')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedProduct);
        });

        it(TESTING_ERROR, async () => {
            offeredProductsService.getOffered.mockRejectedValueOnce(error);
    
            const response = await request(app)
                .get('/offered')
                .set('Authorization', `Bearer ${token}`);
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('createOffered', () => {
        it('should create a product', async () => {
            const expectedProduct = mockOfferedProducts[0];
            offeredProductsService.createOffered.mockResolvedValueOnce(expectedProduct);

            const response = await request(app)
                .post('/offered')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedProduct);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(expectedProduct);
        });

        it(TESTING_ERROR, async () => {
            const expectedProduct = mockOfferedProducts[0];
            offeredProductsService.createOffered.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/offered')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedProduct);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('updateOffered', () => {
        it('should update a product', async () => {
            const expectedProduct = mockOfferedProducts[1];
            offeredProductsService.updateOffered.mockResolvedValueOnce(expectedProduct);

            const response = await request(app)
                .put('/offered/453333')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedProduct);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedProduct);
        });

        it(TESTING_ERROR, async () => {
            const expectedProduct = mockOfferedProducts[0];
            offeredProductsService.updateOffered.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/offered/453333')
                .set('Authorization', `Bearer ${token}`)
                .send(expectedProduct);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return error if product not found', async () => {
            const expectedError = { message: 'Resource not found' };
            offeredProductsService.updateOffered.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/offered/453333')
                .set('Authorization', `Bearer ${token}`)
                .send(mockOfferedProducts[0]);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('deleteOffered', () => {
        it('should delete an offered', async () => {
            const expectedOffered = { message: 'Offered deleted successfully' };
            offeredProductsService.deleteOffered.mockResolvedValueOnce(expectedOffered);

            const response = await request(app)
                .delete('/offered/453333')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expectedOffered);
        });

        it(TESTING_ERROR, async () => {
            offeredProductsService.deleteOffered.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/offered/453333')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(errorMessage);
        });

        it('should return an error if product not found', async () => {
            const expectedError = { message: 'Resource not found' };
            offeredProductsService.deleteOffered.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/offered/452222')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });
    });
});
// pull
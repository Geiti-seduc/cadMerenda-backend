const request = require('supertest');
const app = require('../../app');
const schoolOfferService = require('../services/schoolOfferService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/schoolOfferService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockSchoolOffers = [
    {
        "id": "1003",
        "supplier": {
            "id": "101",
            "company_name": "Assaí Atacadista"
        },
        "total_price": 18.3
    },

    {
        "id": "1002",
        "supplier": {
            "id": "102",
            "company_name": "Assaí Defensista"
        },
        "total_price": 15.3
    }
];

const mockFoodOffers = [
    {
        "offers": [
            {
                "id": "1003",
                "supplier_id": "101",
                "offered_products": [
                    {
                        "product_price": 11.1,
                        "brand": "Converse",
                        "quantity": 100,
                        "id": "301",
                        "name": "Açúcar",
                        "description": "refinado",
                        "measure": "KG"
                    },
                    {
                        "product_price": 5.5,
                        "brand": "Skechers",
                        "quantity": 10,
                        "id": "302",
                        "name": "Sal",
                        "description": "refinado",
                        "measure": "KG"
                    },
                    {
                        "product_price": 1.1,
                        "brand": "Brooks",
                        "quantity": 1,
                        "id": "303",
                        "name": "Óleo",
                        "description": "de soja",
                        "measure": "LT"
                    }
                ]
            }
        ],
        "totalProductPrice": 17.700000000000003
    },
    {
        "offers": [
            {
                "id": "1000",
                "supplier_id": "102",
                "offered_products": [
                    {
                        "product_price": 11.1,
                        "brand": "Converse",
                        "quantity": 150,
                        "id": "301",
                        "name": "Açúcar",
                        "description": "refinado",
                        "measure": "KG"
                    },
                    {
                        "product_price": 5.5,
                        "brand": "Skechers",
                        "quantity": 15,
                        "id": "302",
                        "name": "Sal",
                        "description": "refinado",
                        "measure": "KG"
                    },
                    {
                        "product_price": 1.1,
                        "brand": "Brooks",
                        "quantity": 2,
                        "id": "303",
                        "name": "Óleo",
                        "description": "de soja",
                        "measure": "LT"
                    }
                ]
            }
        ],
        "totalProductPrice": 25.000000000000000
    }
];

describe('School Offer Service', () => {

    describe('getSchoolOffers', () => {

        it('should return all school offers', async () => {

            const offersExpected = mockSchoolOffers;
            schoolOfferService.getSchoolOffersByUserId.mockResolvedValueOnce(offersExpected);

            const response = await request(app)
                .get('/school-offer')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(offersExpected);
        });

        it(TESTING_ERROR, async () => {

            schoolOfferService.getSchoolOffersByUserId.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/school-offer')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if none school-offer id found', async () => {

            const errorExpected = {error: 'Resource not found'};
            schoolOfferService.getSchoolOffersByUserId.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/school-offer')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });

    describe('getOfferFoodById', () => {

        it('should return all offers food', async () => {

            const foodsExpected = mockFoodOffers;
            schoolOfferService.getOfferFoodById.mockResolvedValueOnce(foodsExpected);

            const response = await request(app)
                .get('/school-offer/101')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(foodsExpected);
        });

        it(TESTING_ERROR, async () => {

            schoolOfferService.getOfferFoodById.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/school-offer/101')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if none supplier id found', async () => {

            const errorExpected = {error: 'Resource not found'};
            schoolOfferService.getOfferFoodById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/school-offer/101')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });
});
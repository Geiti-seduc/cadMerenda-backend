/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');
const schoolAndAccessService = require('../services/schoolAndAccessService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/schoolAndAccessService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockAccessSchool = [
    {
        inep: '27036782',
        name: 'ESCOLA ESTADUAL MOREIRA E SILVA',
        lastAccessDate: '05/01/2024, 13:02:28',
    },
    {
        inep: '27036960',
        name: 'ESCOLA ESTADUAL PRINCESA ISABEL',
        lastAccessDate: null,
    },
];

describe('School and Access Controller', () => {
    describe('getSchoolAndAccessData', () => {
        it('should return all access schools', async () => {
            accessExpected = mockAccessSchool;
            schoolAndAccessService.getSchoolAndAccessData.mockResolvedValueOnce(accessExpected);

            const response = await request(app)
                .get('/user-access')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(accessExpected);
        });

        it(TESTING_ERROR, async () => {
            schoolAndAccessService.getSchoolAndAccessData.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/user-access')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });
});
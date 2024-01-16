const request = require('supertest');
const app = require('../../app');
const supplierService = require('../services/supplierService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/supplierService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockSuppliers = [
        
    {
    id: 'string',
    cnpj: 'string',
    nire: 'string',
    company_name: 'string',
    trade_name: 'string',
    state_registration: 'string',
    cnae: 'string',
    phone: 'string',
    email: 'string',
    tech_manager: 'string',
    status: 'string',
    user_id: 'string',
    address_id: 'string',
    createdAt: '2024-01-08T17:48:45.244Z',
    updatedAt: '2024-01-08T17:48:45.244Z'
    },

    {
        id: 'string2',
        cnpj: 'string2',
        nire: 'string2',
        company_name: 'string2',
        trade_name: 'string2',
        state_registration: 'string2',
        cnae: 'string2',
        phone: 'string2',
        email: 'string2',
        tech_manager: 'string2',
        status: 'string22',
        user_id: 'string2',
        address_id: 'string2',
        createdAt: '2024-01-08T17:48:45.243Z',
        updatedAt: '2024-01-08T17:48:45.243Z'
    }
];

describe('Supplier Controller', () => {

    describe('getAllSupliers', () => {

        it('should return all suppliers', async () => {

            const suppliersExpected = mockSuppliers;
            supplierService.getSuppliers.mockResolvedValueOnce(suppliersExpected);

            const response = await request(app)
                .get('/supplier')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(suppliersExpected);
        });

        it(TESTING_ERROR, async () => {

            supplierService.getSuppliers.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/supplier')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getSupplierById', () => {

        it('should return a supplier by id', async () => {

            const supplierExpected = mockSuppliers[0];
            supplierService.getSupplierById.mockResolvedValueOnce(supplierExpected);

            const response = await request(app)
                .get('/supplier/string')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(supplierExpected);
        });

        it(TESTING_ERROR, async () => {

            supplierService.getSupplierById.mockRejectedValueOnce(error);
            
            const response = await request(app)
                .get('/supplier/string')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if supplier id not found', async () => {

            const errorExpected = {error: 'Resource not found'};
            supplierService.getSupplierById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/supplier/string')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });

    describe('getSupplierByUserId', () => {

        it('should return a supplier by user id', async () => {
            
            const supplierExpected = mockSuppliers[1];
            supplierService.getSupplierByUserId.mockResolvedValueOnce(supplierExpected);

            const response = await request(app)
                .get('/supplier/user/string2')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(supplierExpected);
        });

        it(TESTING_ERROR, async () => {

            supplierService.getSupplierByUserId.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/supplier/user/string2')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if user_id not found', async () => {

            const errorExpected = {error: 'Resource not found'};
            supplierService.getSupplierByUserId.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/supplier/user/string2')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });

    describe('createSupplier', () => {

        const userCreated = mockSuppliers[0];

        it('should create a supplier', async () => {

            supplierService.createSupplier.mockResolvedValueOnce(userCreated);

            const response = await request(app)
                .post('/supplier')
                .set('Authorization', `Bearer ${token}`)
                .send(userCreated);
            
            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(userCreated);
        });

        it(TESTING_ERROR, async () => {

            supplierService.createSupplier.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/supplier')
                .set('Authorization', `Bearer ${token}`)
                .send(userCreated);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('updateSupplier', () => {

        const userUpdate = mockSuppliers[1];

        it('should update a supplier', async () => {

            supplierService.updateSupplier.mockResolvedValueOnce(userUpdate);

            const response = await request(app)
                .put('/supplier/string')
                .set('Authorization', `Bearer ${token}`)
                .send(userUpdate);
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(userUpdate);
        
        });

        it(TESTING_ERROR, async () => {

            supplierService.updateSupplier.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/supplier/string')
                .set('Authorization', `Bearer ${token}`)
                .send(userUpdate);
            
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if supplier not found', async () => {

            errorExpected = {error: 'Resource not found'};
            supplierService.updateSupplier.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/supplier/string')
                .set('Authorization', `Bearer ${token}`)
                .send(userUpdate);
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });

    describe('deletedSupplier', () => {

        it('should delete a supplier', async () => {
            messageExpected = {message: 'User deleted successfully'};
            supplierService.deleteSupplier.mockResolvedValueOnce(messageExpected);

            const response = await request(app)
                .delete('/supplier/string')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(messageExpected);
        });

        it(TESTING_ERROR, async () => {

            supplierService.deleteSupplier.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/supplier/string')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return an error if supplier not found', async () => {

            errorExpected = {error: 'Resource not found'};
            supplierService.deleteSupplier.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/supplier/string')
                .set('Authorization', `Bearer ${token}`)
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });
});
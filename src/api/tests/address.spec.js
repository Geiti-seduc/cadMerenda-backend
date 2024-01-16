/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const addressService = require('../services/addressService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/addressService'); //  simular a importação de um módulo durante os testes

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    // criar funções simuladas
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockAddress = [
  {
    id: '10',
    zip: '57.030-010',
    street: 'Rua Epaminondas Gracindo',
    number: '238',
    complement: 'prédio',
    district: 'Pajuçara',
    city: 'Maceió',
    state: 'Alagoas',
    immediate_region: 'sei lá',
    intermediate_region: 'não sei também',
    createdAt: '2024-01-03T12:33:14.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
  },
  {
    id: '11',
    zip: '57.240-970',
  },
];

describe('Address Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAddress', () => {
    it('should return all address', async () => {
      const expectedAddress = mockAddress;
      addressService.getAddress.mockResolvedValueOnce(expectedAddress); // método que define o valor retornado pela função simulada quando ela é chamada

      const response = await request(app)
        .get('/address')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedAddress);
      expect(addressService.getAddress).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      addressService.getAddress.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/address')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getAddressById', () => {
    it('should return an address by id', async () => {
      const expectedAddress = mockAddress[0];
      addressService.getAddressById.mockResolvedValueOnce(expectedAddress);

      const response = await request(app)
        // eslint-disable-next-line sonarjs/no-duplicate-string
        .get('/address/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedAddress);
      expect(addressService.getAddressById).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      addressService.getAddressById.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/address/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if address not found', async () => {
      const expectedError = { error: 'Resource not found' };
      addressService.getAddressById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/address/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('createNewAddress', () => {
    it('should create a new address', async () => {
      const newAddress = mockAddress[0];
      const zipAndId = { id: mockAddress[0].id, zip: mockAddress[0].zip };
      addressService.createAddress.mockResolvedValueOnce(newAddress);

      const response = await request(app)
        .post('/address')
        .set('Authorization', `Bearer ${token}`)
        .send(newAddress);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(zipAndId);
      expect(addressService.createAddress).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      addressService.createAddress.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .post('/address')
        .set('Authorization', `Bearer ${token}`)
        .send(mockAddress[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if required fields are missing', async () => {
      const expectedError = { error: 'Missing required fields' };
      addressService.createAddress.mockResolvedValueOnce(expectedError);

      const response = await request(app)
        .post('/address')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('updateAddress', () => {
    it('should update an address', async () => {
      const updatedAddress = mockAddress[0];
      addressService.updateAddress.mockResolvedValueOnce(updatedAddress);

      const response = await request(app)
        .put('/address/10')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedAddress);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedAddress);
      expect(addressService.updateAddress).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      addressService.updateAddress.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .put('/address/10')
        .set('Authorization', `Bearer ${token}`)
        .send(mockAddress[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error when address_id is not informed or is not found', async () => {
      const expectedError = { error: 'Resource not found' };
      addressService.updateAddress.mockResolvedValueOnce(expectedError);
      addressService.getAddressById.mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/address')
        .set('Authorization', `Bearer ${token}`)
        .send(mockAddress[0]);

      expect(response.statusCode).toBe(404);
    });
  });

  describe('deleteAddress', () => {
    it('should delete an address', async () => {
      const expectedAddress = { message: 'Resource deleted successfully' };
      addressService.deletedAddress.mockResolvedValueOnce(expectedAddress);

      const response = await request(app)
        .delete('/address/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedAddress);
      expect(addressService.deletedAddress).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      addressService.deletedAddress.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .delete('/address/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error when address_id is not informed or is not found', async () => {
      const expectedError = { error: 'Resource not found' };
      addressService.deletedAddress.mockResolvedValueOnce(expectedError);
      addressService.getAddressById.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/address')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
    });
  });
});

/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const certificateService = require('../services/certificateService');
const requiredCertificateService = require('../services/requiredCertificateService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));
jest.mock('../../utils/extractUserId', () => jest.fn(() => 'id-ficticio'));

jest.mock('../services/certificateService');
jest.mock('../services/requiredCertificateService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockCertificate = [
  {
    id: '20',
    user_id: '78412044741',
    required_certificate_id: '1',
    expiration: '2024-01-03T12:33:54.106Z',
    archive: 'www.carcara.com',
    createdAt: '2024-01-03T12:33:54.114Z',
    updatedAt: '2024-01-03T12:33:54.114Z',
  },
  {
    id: '21',
    user_id: '78412044741',
    required_certificate_id: '2',
    expiration: '2024-01-03T12:33:54.106Z',
    archive: 'www.rato.com',
    createdAt: '2024-01-03T12:33:54.427Z',
    updatedAt: '2024-01-03T12:33:54.427Z',
  },
];
const rota = '/certificate';

describe('Certificate Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCertificate', () => {
    it('should return all certificate', async () => {
      const expectedCertificate = mockCertificate;
      certificateService.getCertificate.mockResolvedValueOnce(expectedCertificate);

      const response = await request(app)
        .get(`${rota}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCertificate);
      expect(certificateService.getCertificate).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      certificateService.getCertificate.mockRejectedValueOnce(error);

      const response = await request(app)
        .get(`${rota}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(certificateService.getCertificate).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCertificateById', () => {
    it('should return an certificate by id', async () => {
      const expectedCertificate = mockCertificate[0];
      certificateService.getCertificateById.mockResolvedValueOnce(expectedCertificate);

      const response = await request(app)
        .get(`${rota}/20`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedCertificate);
      expect(certificateService.getCertificateById).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      certificateService.getCertificateById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get(`${rota}/20`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
      expect(certificateService.getCertificateById).toHaveBeenCalledTimes(1);
    });

    it('should return an error if certificate not found', async () => {
      const expectedError = { error: 'Resource not found' };
      certificateService.getCertificateById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get(`${rota}/20`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('createNewCertificate', () => {
    it('should create a new certificate', async () => {
      const newCertificate = mockCertificate[0];
      const expAndName = {
        expiration: mockCertificate[0].expiration,
        name: 'CND MUNICIPAL',
      };
      certificateService.createCertificate.mockResolvedValueOnce(newCertificate);
      requiredCertificateService.getCertificateIdByName.mockResolvedValueOnce(1);

      const response = await request(app)
        .post(`${rota}`)
        .set('Authorization', `Bearer ${token}`)
        .send(expAndName);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newCertificate);
      expect(certificateService.createCertificate).toHaveBeenCalledTimes(1);
    });

    it('should return an error if certificate not found', async () => {
      const expectedError = { error: 'Certificate not found' };
      const expAndName = {
        expiration: mockCertificate[0].expiration,
        name: 'CND MUNICIPAL',
      };
      requiredCertificateService.getCertificateIdByName.mockResolvedValueOnce(null);

      const response = await request(app)
        .post(`${rota}`)
        .set('Authorization', `Bearer ${token}`)
        .send(expAndName);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      const expAndName = {
        expiration: mockCertificate[0].expiration,
        name: 'CND MUNICIPAL',
      };
      certificateService.createCertificate.mockRejectedValueOnce(expectedError);
      requiredCertificateService.getCertificateIdByName.mockResolvedValueOnce(1);

      const response = await request(app)
        .post(`${rota}`)
        .set('Authorization', `Bearer ${token}`)
        .send(expAndName);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('updateCertificate', () => {
    it('should update a certificate', async () => {
      const { expiration } = mockCertificate[0];
      // eslint-disable-next-line max-len
      certificateService.getCertificateByRequiredCertificateId.mockResolvedValueOnce(
        null,
      );
      certificateService.getCertificateById.mockResolvedValueOnce(mockCertificate[0]);
      certificateService.updateCertificate.mockResolvedValueOnce(mockCertificate[0]);

      const response = await request(app)
        .put(`${rota}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({ expiration });

      expect(response.statusCode).toBe(200);
      // eslint-disable-next-line max-len
      expect(
        certificateService.getCertificateByRequiredCertificateId,
      ).toHaveBeenCalledTimes(1);
    });

    it('should create a new certificate if not found', async () => {
      const { expiration } = mockCertificate[0];
      certificateService.getCertificateByRequiredCertificateId.mockResolvedValueOnce(
        null,
      );
      certificateService.getCertificateById.mockResolvedValueOnce(null);
      certificateService.createCertificate.mockResolvedValueOnce(mockCertificate[0]);

      const response = await request(app)
        .put(`${rota}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({ expiration });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCertificate[0]);
      // eslint-disable-next-line max-len
      expect(
        certificateService.getCertificateByRequiredCertificateId,
      ).toHaveBeenCalledTimes(1);
      expect(certificateService.createCertificate).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const { expiration } = mockCertificate[0];
      const expectedError = error;
      // eslint-disable-next-line max-len
      certificateService.getCertificateByRequiredCertificateId.mockRejectedValueOnce(
        expectedError,
      );

      const response = await request(app)
        .put(`${rota}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send({ expiration });

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
      // eslint-disable-next-line max-len
      expect(
        certificateService.getCertificateByRequiredCertificateId,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteCertificate', () => {
    it('should delete a certificate', async () => {
      const message = { message: 'Certificate deleted successfully' };
      const expectedCertificate = mockCertificate[0];
      certificateService.getCertificateById.mockResolvedValueOnce(expectedCertificate);
      certificateService.deletedCertificate.mockResolvedValueOnce(expectedCertificate);

      const response = await request(app)
        .delete(`${rota}/20`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(message);
      expect(certificateService.deletedCertificate).toHaveBeenCalledTimes(1);
    });

    it('should return an error if certificate not found', async () => {
      const expectedError = { error: 'Not possible to delete your certificate.' };
      certificateService.getCertificateById.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete(`${rota}/20`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });
});

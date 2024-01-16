/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const school_modalityService = require('../services/school_modalityService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/school_modalityService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    // criar funções simuladas
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockschool_modality = {
  id: '10',
  school_inep: '27036731',
  modality_id: '910',
  createdAt: '2024-01-09T14:46:07.270Z',
  updatedAt: '2024-01-09T14:46:07.270Z',
};

const createschool_modality = {
  school_inep: '27036731',
  modality_id: '910',
};

const updateschool_modality = {
    name: 'Escola Municipal de Educação Básica Professora Maria de Lourdes Melo e Silva',
    address_id: '10',
    school_inep: '27036731',
}; 

describe('school_modality Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllschool_modality', () => {
    it('should return all school_modality', async () => {
      const expectedschool_modality = mockschool_modality;
      school_modalityService.getschool_modality.mockResolvedValueOnce(
        expectedschool_modality,
      );

      const response = await request(app)
        .get('/school_modality')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedschool_modality);
    });

    it(TESTING_ERROR, async () => {
      school_modalityService.getschool_modality.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/school_modality')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('getschool_modalityById', () => {
    it('should return one school_modality', async () => {
      const expectedschool_modality = mockschool_modality;
      school_modalityService.getschool_modalityById.mockResolvedValueOnce(
        expectedschool_modality,
      );

      const response = await request(app)
        .get('/school_modality/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(expectedschool_modality);
    });

    it(TESTING_ERROR, async () => {
      school_modalityService.getschool_modalityById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/school_modality/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if school_modality not found', async () => {
      const expectedError = { error: 'Resource not found' };
      school_modalityService.getschool_modalityById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/school_modality/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('create school_modality', () => {
    it('should create a new school_modality', async () => {
      const newschool_modality = mockschool_modality;
      school_modalityService.createschool_modality.mockResolvedValueOnce(
        newschool_modality,
      );

      const response = await request(app)
        .post('/school_modality/create')
        .set('Authorization', `Bearer ${token}`)
        .send(createschool_modality);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newschool_modality);
      expect(school_modalityService.createschool_modality).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      school_modalityService.createschool_modality.mockRejectedValueOnce(
        expectedError,
      );

      const response = await request(app)
        .post('/school_modality/create')
        .set('Authorization', `Bearer ${token}`)
        .send(createschool_modality);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });
  });

    describe('update school_modality', () => {
        it('should update a school_modality', async () => {
        const expectedschool_modality = mockschool_modality;
        school_modalityService.getschool_modalityById.mockResolvedValueOnce(
            expectedschool_modality,
        );
        school_modalityService.updateschool_modality.mockResolvedValueOnce(
            expectedschool_modality,
        );
    
        const response = await request(app)
            .put('/school_modality/10')
            .set('Authorization', `Bearer ${token}`)
            .send(updateschool_modality);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expectedschool_modality);
        expect(school_modalityService.updateschool_modality).toHaveBeenCalledTimes(1);
        });
    
        it(TESTING_ERROR, async () => {
        const expectedError = error;
        school_modalityService.updateschool_modality.mockRejectedValueOnce(
            expectedError,
        );
    
        const response = await request(app)
            .put('/school_modality/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedError);
    
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(expectedError);
        });
    
        it('should return an error if school_modality not found', async () => {
        const expectedError = { error: 'Resource not found' };
        school_modalityService.updateschool_modality.mockResolvedValueOnce(null);
    
        const response = await request(app)
            .put('/school_modality/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedError);
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(expectedError);
        });
    }); 

    describe('delete school_modality', () => {
        it('should delete a school_modality', async () => {
        const expectedschool_modality = mockschool_modality;
        school_modalityService.getschool_modalityById.mockResolvedValueOnce(
            expectedschool_modality,
        );
        school_modalityService.deleteschool_modality.mockResolvedValueOnce(
            expectedschool_modality,
        );
    
        const response = await request(app)
            .delete('/school_modality/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedschool_modality);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'school_modality deleted successfully' });
        expect(school_modalityService.deleteschool_modality).toHaveBeenCalledTimes(1);
        });
    
        it(TESTING_ERROR, async () => {
        const expectedError = error;
        school_modalityService.deleteschool_modality.mockRejectedValueOnce(
            expectedError,
        );
    
        const response = await request(app)
            .delete('/school_modality/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedError);
    
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(expectedError);
        });
    
        it('should return an error if school_modality not found', async () => {
        const expectedError = { error: 'Resource not found' };
        school_modalityService.deleteschool_modality.mockResolvedValueOnce(null);
    
        const response = await request(app)
            .delete('/school_modality/10')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedError);
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(expectedError);
        });
    });
});

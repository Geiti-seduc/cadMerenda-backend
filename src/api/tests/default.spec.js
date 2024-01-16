/* eslint-disable max-lines-per-function */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../../app');

const defaultService = require('../services/defaultService');
const accessService = require('../services/acessService');
const userService = require('../services/userService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));
jest.mock('../services/acessService', () => ({
  createAcess: jest.fn(),
}));

jest.mock('../services/defaultService');
jest.mock('../services/userService');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockUser = [
  {
    id: '1',
    email: 'teste@teste.com',
    name: 'teste',
    password: 'teste',
    role: 'Nutri',
  },
  {
    email: 'anderson@test.com',
    password: '123456',
  },
];

describe('Default Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('return token', () => {
    it('should return token', async () => {
      jwt.verify.mockImplementation(() => ({ id: 'id-ficticio' }));

      const response = await request(app).post(`/token/${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ id: 'id-ficticio' });
    });

    it(TESTING_ERROR, async () => {
      jwt.verify.mockImplementation(() => {
        throw error;
      });

      const response = await request(app).post(`/token/${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('login user', () => {
    it('should login user', async () => {
      const expectedUser = { id: '1', name: 'teste', role: 'Nutri', password: 'teste' };
      userService.getUserbyEmail.mockResolvedValueOnce(expectedUser);
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce(token);

      defaultService.updateLogin.mockResolvedValueOnce(null);
      accessService.createAcess.mockResolvedValueOnce(null);

      const response = await request(app).post('/login').send(mockUser[1]);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        token,
        role: expectedUser.role,
        userId: expectedUser.id,
      });
    });

    it('should return an error if email or password not informed', async () => {
      const expectedError = { error: 'Email or password not informed' };
      const response = await request(app).post('/login').send({});

      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if user not found', async () => {
      const expectedError = { error: 'User not found' };
      userService.getUserbyEmail.mockResolvedValueOnce(null);

      const response = await request(app).post('/login').send(mockUser[1]);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if password is incorrect', async () => {
      const expectedError = { error: 'Incorrect email or password' };
      userService.getUserbyEmail.mockResolvedValueOnce(mockUser[0]);
      bcrypt.compare.mockResolvedValueOnce(false);

      const response = await request(app).post('/login').send(mockUser[1]);

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual(expectedError);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      userService.getUserbyEmail.mockRejectedValueOnce(expectedError);

      const response = await request(app).post('/login').send(mockUser[1]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('register user', () => {
    it('should return an error if one or more fields not informed', async () => {
        const expectedError = { error: 'One or more fields not informed' };
        const response = await request(app).post('/register').send({});
    
        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual(expectedError);
    });

    it('should return an error if user already exists', async () => {
      const expectedError = { error: 'User already exists' };
      userService.getUserbyEmail.mockResolvedValueOnce(mockUser[0]);

      const response = await request(app).post('/register').send(mockUser[0]);

      expect(response.statusCode).toBe(409);
      expect(response.body).toEqual(expectedError);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      userService.getUserbyEmail.mockRejectedValueOnce(expectedError);

      const response = await request(app).post('/register').send(mockUser[0]);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });
  });

    describe('update user', () => {
        it('should update user', async () => {
        const expectedUser = { password: 'teste' };
        userService.getUserbyId.mockResolvedValueOnce(expectedUser);
        userService.updateUser.mockResolvedValueOnce(mockUser[0]);
        bcrypt.compare.mockResolvedValueOnce(false);
    
        const response = await request(app)
            // eslint-disable-next-line sonarjs/no-duplicate-string
            .put('/forgot-password/updateUser/1')
            .set('Authorization', `Bearer ${token}`)
            .send(expectedUser);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockUser[0]);
        });
    
        it(TESTING_ERROR, async () => {
        const expectedError = error;
        userService.updateUser.mockRejectedValueOnce(expectedError);
        userService.getUserbyId.mockResolvedValueOnce(mockUser[0]);
        bcrypt.compare.mockResolvedValueOnce(false);
    
        const response = await request(app)
            .put('/forgot-password/updateUser/1')
            .set('Authorization', `Bearer ${token}`)
            .send(mockUser[0]);
    
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual(expectedError);
        });

        it('should return an error when one or more fields not informed', async () => {
            const expectedError = { error: 'One or more fields not informed' };
            userService.updateUser.mockResolvedValueOnce(expectedError);
        
            const response = await request(app)
                .put('/forgot-password/updateUser/1')
                .set('Authorization', `Bearer ${token}`)
                .send({});
        
            expect(response.statusCode).toBe(422);
            expect(response.body).toEqual(expectedError);
        });

        it('should return an error when user not found', async () => {
            const expectedError = { error: 'User not found' };
            userService.updateUser.mockResolvedValueOnce(expectedError);
        
            const response = await request(app)
                .put('/forgot-password/updateUser/1')
                .set('Authorization', `Bearer ${token}`)
                .send(mockUser[0]);
        
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(expectedError);
        });

        it('should return an error when password is equal to old password', async () => {
            const expectedError = { error: 'Utilize uma senha diferente das anteriores' };
            userService.updateUser.mockResolvedValueOnce(expectedError);
            userService.getUserbyId.mockResolvedValueOnce(mockUser[0]);
            bcrypt.compare.mockResolvedValueOnce(true);
        
            const response = await request(app)
                .put('/forgot-password/updateUser/1')
                .set('Authorization', `Bearer ${token}`)
                .send(mockUser[0]);
        
            expect(response.statusCode).toBe(401);
            expect(response.body).toEqual(expectedError);
        });
    });
});

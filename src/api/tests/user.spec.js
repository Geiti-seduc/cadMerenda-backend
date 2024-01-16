/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const userService = require('../services/userService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/userService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    // criar funções simuladas
    req.userId = 'id-ficticio';
    next();
}));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockUser = [
  {
    id: '10',
    email: 'teste',
    name: 'teste',
    role: 'teste',
    createdAt: '2024-01-03T12:33:14.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
    lastLogin: '2024-01-03T12:33:14.659Z',
    active: 'teste',
  },
  {
    id: '11',
    email: 'teste',
    name: 'teste',
    role: 'teste',
    createdAt: '2024-01-03T12:33:64.659Z',
    updatedAt: '2024-01-03T12:33:14.659Z',
    lastLogin: '2024-01-03T12:33:14.659Z',
    active: 'teste',
  },
];

const mockCreate = [
  {
    id: '10',
    email: 'teste',
    name: 'teste',
    password: 'teste',
    role: 'teste',
    schoolInep: 'teste',
  },
  {
    id: '10',
    email: 'teste',
    name: 'teste',
    password: 'teste',
    role: 'teste',
  },
];

describe('User Controller', () => {
  describe('getAllUser', () => {
    it('should return all user', async () => {
      const expectedUser = mockUser;
      userService.getUsers.mockResolvedValueOnce(expectedUser);

      const response = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedUser);
    });

    it(TESTING_ERROR, async () => {
      userService.getUsers.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('getInactiveUser', () => {
    it('should return all inactive user', async () => {
      const expectedUser = mockUser;
      userService.getInactiveUsers.mockResolvedValueOnce(expectedUser);

      const response = await request(app)
        .get('/user/inactive')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedUser);
    });

    it(TESTING_ERROR, async () => {
      userService.getInactiveUsers.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/user/inactive')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });
  });

  describe('getUserbydId', () => {
    it('should return a user by id', async () => {
      const expectedUser = mockUser[0];
      userService.getUserbyId.mockResolvedValueOnce(expectedUser);

      const response = await request(app)
        .get('/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(expectedUser);
    });

    it(TESTING_ERROR, async () => {
      userService.getUserbyId.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if user not found', async () => {
      const expectedError = { error: 'User not found' };
      userService.getUserbyId.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      const newUser = mockCreate[1];
      userService.createUser.mockResolvedValueOnce(newUser);

      const response = await request(app)
        .post('/user')
        .set('Authorization', `Bearer ${token}`)
        .send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        id: '10',
        email: 'teste',
        name: 'teste',
        role: 'teste',
      });
    });

    it(TESTING_ERROR, async () => {
      userService.createUser.mockRejectedValueOnce(error);

      const response = await request(app)
        .post('/user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '10',
          email: 'teste',
          name: 'teste',
          password: 'teste',
          role: 'teste',
        });

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if one or more fields not informed', async () => {
      const expectedError = { error: 'CPF, email, name, password, or role not informed' };
      const response = await request(app)
        .post('/user')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('get user by email', () => {
    it('should return a user by email', async () => {
      const expectedUser = mockUser[0];
      userService.getUserbyEmail.mockResolvedValueOnce(expectedUser);

      const response = await request(app)
        .get('/user/userInfo/teste')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedUser);
    });

    it(TESTING_ERROR, async () => {
      userService.getUserbyEmail.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/user/userInfo/teste')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if user not found', async () => {
      const expectedError = { error: 'User not found' };
      userService.getUserbyEmail.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/user/userInfo/teste')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('delete user', () => {
    it('should delete a user', async () => {
      const expectedUser = mockUser[0];
      userService.deleteUser.mockResolvedValueOnce(expectedUser);

      const response = await request(app)
        .delete('/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'User deleted successfully' });
    });

    it(TESTING_ERROR, async () => {
      userService.deleteUser.mockRejectedValueOnce(error);

      const response = await request(app)
        .delete('/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(error);
    });

    it('should return an error if user not found', async () => {
      const expectedError = { error: 'User not found' };
      userService.deleteUser.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });
});

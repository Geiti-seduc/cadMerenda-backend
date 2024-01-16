/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const general_listService = require('../services/general_listService');
const general_list_foodService = require('../services/general_list_foodService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/general_listService');
jest.mock('../services/general_list_foodService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockGeneral_List = [
  {
    name: 'Lista de Produtos 47',
    description: 'Descrição da lista desse mes 9',
    cycle_id: '48624',
    modality_id: '903',
    general_list_itens: [
      {
        food_id: '307',
      },
      {
        food_id: '305',
      },
    ],
  },
  {
    id: '123456789',
    modality: {
      id: '987654321',
      general_list: [
        {
          id: '111',
          general_list_food: [
            {
              id: 'aaa',
              food_id: 'apple',
              general_list_id: '111',
              createdAt: '2023-12-01T08:00:00Z',
              updatedAt: '2023-12-01T10:30:00Z',
            },
            {
              id: 'bbb',
              food_id: 'banana',
              general_list_id: '111',
              createdAt: '2023-12-02T09:15:00Z',
              updatedAt: '2023-12-02T11:45:00Z',
            },
          ],
        },
        {
          id: '222',
          general_list_food: [
            {
              id: 'ccc',
              food_id: 'carrot',
              general_list_id: '222',
              createdAt: '2023-12-03T11:00:00Z',
              updatedAt: '2023-12-03T13:20:00Z',
            },
            {
              id: 'ddd',
              food_id: 'durian',
              general_list_id: '222',
              createdAt: '2023-12-04T13:45:00Z',
              updatedAt: '2023-12-04T15:10:00Z',
            },
          ],
        },
      ],
    },
  },
  {
    id: '987654',
    cycle_id: '123456',
    description: 'This is a test description.',
    modality_id: '789012',
    createdAt: '2023-05-15T08:30:00Z',
    updatedAt: '2023-05-15T10:45:00Z',
  },
  {
    id: '123456789',
    food_id: 'apple',
    general_list_id: '987654321',
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
  },
  {
    General_List: {
      cycle_id: '48624',
      description: 'Descrição da lista desse mes 9',
      general_list_itens: [
        {
          food_id: '307',
        },
        {
          food_id: '305',
        },
      ],
      modality_id: '903',
      name: 'Lista de Produtos 47',
    },
    General_List_Products: [
      {
        food_id: {
          food_id: '307',
        },
      },
      {
        food_id: {
          food_id: '305',
        },
      },
    ],
  },
  {
      id: '701',
      cycle_id: '48624',
      // eslint-disable-next-line max-len
      description: 'A lista do primeiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!',
      modality_id: '901',
      general_list_food: [
          {
              id: '801',
              food_id: '301',
              nmc: 12345678,
              measure: 'KG',
              category: 'Açúcar e doces',
              description: 'refinado',
          },
      ],
  },
];

describe('General List Controller', () => {
  describe('getAllGeneral_List', () => {
    it('should return all general_list', async () => {
      const expectedGeneral_List = mockGeneral_List;
      general_listService.getGeneral_List.mockResolvedValueOnce(expectedGeneral_List);

      const response = await request(app)
        .get('/general_list')
        .set('authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGeneral_List);
    });

    it(TESTING_ERROR, async () => {
      general_listService.getGeneral_List.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/general_list')
        .set('authorization', token);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('getGeneral_ListById', () => {
    it('should return a general_list by id', async () => {
      const expectedGeneral_List = mockGeneral_List[4];
      general_listService.getGeneral_ListById.mockResolvedValueOnce(expectedGeneral_List);

      const response = await request(app)
        .get('/general_list/701')
        .set('authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGeneral_List);
    });

    it(TESTING_ERROR, async () => {
      general_listService.getGeneral_ListById.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/general_list/701')
        .set('authorization', token);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should return an error if general_list not found', async () => {
      const expectedError = { error: 'Resource not found' };
      general_listService.getGeneral_ListById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/general_list/701')
        .set('authorization', token);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getGeneral_ListBySchool', () => {
    it('should return a general_list by school', async () => {
      const expectedGeneral_List = mockGeneral_List[1];
      general_listService.getGeneral_ListBySchool.mockResolvedValueOnce(
        expectedGeneral_List,
      );

      const response = await request(app)
        .get('/general_list/school/123456789')
        .set('authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGeneral_List);
    });

    it(TESTING_ERROR, async () => {
      general_listService.getGeneral_ListBySchool.mockRejectedValueOnce(null);

      const response = await request(app)
        .get('/general_list/school/123456789')
        .set('authorization', token);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should return an error if general_list not found', async () => {
      const expectedError = { error: 'Resource not found' };
      general_listService.getGeneral_ListBySchool.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/general_list/school/123456789')
        .set('authorization', token);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getGeneral_ListByCycle', () => {
    it('should return a general_list by cycle', async () => {
      const expectedGeneral_List = mockGeneral_List[1];
      general_listService.getGeneral_ListByCycle.mockResolvedValueOnce(
        expectedGeneral_List,
      );

      const response = await request(app)
        .get('/general_list/cycle/48624')
        .set('authorization', token);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGeneral_List);
    });

    it(TESTING_ERROR, async () => {
      general_listService.getGeneral_ListByCycle.mockRejectedValueOnce(error);

      const response = await request(app)
        .get('/general_list/cycle/48624')
        .set('authorization', token);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should return an error if general_list not found', async () => {
      const expectedError = { error: 'Resource not found' };
      general_listService.getGeneral_ListByCycle.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/general_list/cycle/48624')
        .set('authorization', token);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('createGeneral_List', () => {
    it('should create a general_list', async () => {
      const expectedGeneral_List = mockGeneral_List[0];
      // eslint-disable-next-line max-len
      general_listService.getGeneral_ListByCycleAndModality.mockResolvedValueOnce([]);
      general_listService.createGeneral_List.mockResolvedValueOnce(expectedGeneral_List);
      general_list_foodService.creategeneral_list_food.mockResolvedValueOnce(
        mockGeneral_List[3],
      );

      const response = await request(app)
        .post('/general_list/create')
        .set('authorization', token)
        .send(expectedGeneral_List);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual({
        newGeneral_List: expectedGeneral_List,
        General_List_Products: [
          {
            food_id: {
              food_id: '307',
            },
          },
          {
            food_id: {
              food_id: '305',
            },
          },
        ],
      });
    });

    it(TESTING_ERROR, async () => {
      const expectedGeneral_List = mockGeneral_List[0];
      general_listService.getGeneral_ListByCycleAndModality.mockRejectedValueOnce(error);

      const response = await request(app)
        .post('/general_list/create')
        .set('authorization', token)
        .send(expectedGeneral_List);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should return an error if exists general list', async () => {
      const expectedError = { error: 'General List already exists' };
      const expectedGeneral_List = mockGeneral_List[0];
      // eslint-disable-next-line max-len
      general_listService.getGeneral_ListByCycleAndModality.mockResolvedValueOnce([
        expectedGeneral_List,
      ]);

      const response = await request(app)
        .post('/general_list/create')
        .set('authorization', token)
        .send(expectedGeneral_List);

      expect(response.statusCode).toEqual(409);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('updateGeneral_List', () => {
    it('should update a general_list', async () => {
      const expectedGeneral_List = mockGeneral_List[2];
      general_listService.getGeneral_ListById.mockResolvedValueOnce(expectedGeneral_List);
      general_listService.updateGeneral_List.mockResolvedValueOnce(expectedGeneral_List);

      const response = await request(app)
        .put('/general_list/123456789')
        .set('authorization', token)
        .send(expectedGeneral_List);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedGeneral_List);
    });

    it(TESTING_ERROR, async () => {
      const expectedGeneral_List = mockGeneral_List[2];
      general_listService.getGeneral_ListById.mockRejectedValueOnce(error);

      const response = await request(app)
        .put('/general_list/123456789')
        .set('authorization', token)
        .send(expectedGeneral_List);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should return an error if general_list not found', async () => {
      const expectedError = { error: 'Resource not found' };
      const expectedGeneral_List = mockGeneral_List[2];
      general_listService.getGeneral_ListById.mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/general_list/123456789')
        .set('authorization', token)
        .send(expectedGeneral_List);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('deleteGeneral_List', () => {
    it('should delete a general_list', async () => {
      const expectedGeneral_List = mockGeneral_List[2];
      general_listService.getGeneral_ListById.mockResolvedValueOnce(expectedGeneral_List);
      general_listService.deleteGeneral_List.mockResolvedValueOnce(expectedGeneral_List);

      const response = await request(app)
        .delete('/general_list/123456789')
        .set('authorization', token);

      expect(response.statusCode).toEqual(200);
      // eslint-disable-next-line max-len
      expect(response.body).toEqual({ message: 'General List deleted successfully' });
    });

    it(TESTING_ERROR, async () => {
      general_listService.deleteGeneral_List.mockRejectedValueOnce(error);
      general_listService.getGeneral_ListById.mockRejectedValueOnce(error);

      const response = await request(app)
        .delete('/general_list/123456789')
        .set('authorization', token);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });

    it('should return an error if general_list not found', async () => {
      const expectedError = { error: 'Resource not found' };
      general_listService.getGeneral_ListById.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/general_list/123456789')
        .set('authorization', token);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual(expectedError);
    });
  });
});

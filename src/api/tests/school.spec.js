/* eslint-disable */
const request = require('supertest');
const app = require('../../app');
const schoolService = require('../services/schoolService');
const addressService = require('../services/addressService');
const school_modalityService = require('../services/school_modalityService');

jest.mock('../controllers/logsController', () => ({
  creationLog: jest.fn(() => console.log('Logs creation created')),
  updateLog: jest.fn(() => console.log('Logs update created')),
  deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/schoolService');
jest.mock('../services/addressService');
jest.mock('../services/school_modalityService');

jest.mock('../middleware/loginRequired', () =>
  jest.fn(() => (req, res, next) => {
    req.userId = 'id-ficticio';
    next();
  })
);

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';

const mockSchool = [
  {
    inep: '123',
    name: 'ESCOLA ESTADUAL MOREIRA E SILVA',
    cnpj: '2324568784562',
    phone: '9545784521',
    email: 'escola1@gmail.com',
    addressId: '22',
    city: 'Maceió',
    createdAt: '2024-01-09T14:34:38.139Z',
    updatedAt: '2024-01-09T14:34:38.139Z',
    geeId: '413',
    Address: {
      id: '22',
      zip: '57.055-000',
      street: 'Av. Fernandes Lima',
      number: 'S/N',
      complement: 'CEPA',
      district: 'Farol',
      city: 'Maceió',
      state: 'Alagoas',
      immediate_region: 'sei lá',
      intermediate_region: 'não sei também',
    },
    modalities: [
      {
        modality: {
          name: 'Educação Básica - Tempo Parcial',
        },
      },
    ],
  },
];

const mockCreateSchool = [
  {
    name: 'Nome da Instituição',
    inep: '12345213122133231678',
    cnpj: '12.342135.678/0133412001-90',
    geeId: '402',
    phone: '1234567890',
    email: 'exemplo@instituicao.com',
    modalities: [{ id: '901' }],
    address: {
      zip: '12345123-678',
      street: 'Rua Exemplo',
      number: '123',
      district: 'Bairro Exemplo',
      city: 'Cidade Exemplo',
      state: 'UF',
      complement: 'Complemento Exemplo',
      immediate_region: 'Região Imediata Exemplo',
      intermediate_region: 'Região Intermediária Exemplo',
    },
  },
  {
    id: '22',
    zip: '57.055-000',
    street: 'Av. Fernandes Lima',
    number: 'S/N',
    complement: 'CEPA',
    district: 'Farol',
    city: 'Maceió',
    state: 'Alagoas',
    immediate_region: 'sei lá',
    intermediate_region: 'não sei também',
    name: 'Nome da Instituição',
    inep: '12345213122133231678',
    cnpj: '12.342135.678/0133412001-90',
    geeId: '402',
    phone: '1234567890',
    email: 'exemplo@instituicao.com',
    modalities: [{ id: '901' }],
    address: {
      zip: '12345123-678',
      street: 'Rua Exemplo',
      number: '123',
      district: 'Bairro Exemplo',
      city: 'Cidade Exemplo',
      state: 'UF',
      complement: 'Complemento Exemplo',
      immediate_region: 'Região Imediata Exemplo',
      intermediate_region: 'Região Intermediária Exemplo',
    },
    mods: [
      [
        {
          modality: {
            name: 'Educação Básica - Tempo Parcial',
          },
        },
      ],
    ],
  },
  {
    added: [],
    removed: [],
    id: '22',
    zip: '57.055-000',
    street: 'Av. Fernandes Lima',
    number: 'S/N',
    complement: 'CEPA',
    district: 'Farol',
    city: 'Maceió',
    state: 'Alagoas',
    immediate_region: 'sei lá',
    intermediate_region: 'não sei também',
  },
];

const final = [
  {
    inep: '123',
    name: 'ESCOLA ESTADUAL MOREIRA E SILVA',
    cnpj: '2324568784562',
    phone: '9545784521',
    email: 'escola1@gmail.com',
    addressId: '22',
    createdAt: '2024-01-09T14:34:38.139Z',
    updatedAt: '2024-01-09T14:34:38.139Z',
    geeId: '413',
    Address: {
      id: '22',
      zip: '57.055-000',
      street: 'Av. Fernandes Lima',
      number: 'S/N',
      complement: 'CEPA',
      district: 'Farol',
      city: 'Maceió',
      state: 'Alagoas',
      immediate_region: 'sei lá',
      intermediate_region: 'não sei também',
    },
    modalities: [
      {
        modality: {
          name: 'Educação Básica - Tempo Parcial',
        },
      },
    ],
    city: 'Maceió',
  },
];

const update = {
  school: {
    inep: '123',
    name: 'ESCOLA ESTADUAL MOREIRA E SILVA',
    cnpj: '2324568784562',
    phone: '9545784521',
    email: 'escola1@gmail.com',
    addressId: '22',
    city: 'Maceió',
    createdAt: '2024-01-09T14:34:38.139Z',
    updatedAt: '2024-01-09T14:34:38.139Z',
    geeId: '413',
    Address: {
      id: '22',
      zip: '57.055-000',
      street: 'Av. Fernandes Lima',
      number: 'S/N',
      complement: 'CEPA',
      district: 'Farol',
      city: 'Maceió',
      state: 'Alagoas',
      immediate_region: 'sei lá',
      intermediate_region: 'não sei também',
    },
    modalities: [{ modality: { name: 'Educação Básica - Tempo Parcial' } }],
  },
  address: {
    id: '22',
    zip: '57.055-000',
    street: 'Av. Fernandes Lima',
    number: 'S/N',
    complement: 'CEPA',
    district: 'Farol',
    city: 'Maceió',
    state: 'Alagoas',
    immediate_region: 'sei lá',
    intermediate_region: 'não sei também',
  },
  users: [],
};

describe('schoolController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSchool', () => {
    it('should return all schools', async () => {
      const expectSchool = final;
      schoolService.getSchools.mockResolvedValueOnce(expectSchool);
      school_modalityService.getSchoolModalities.mockResolvedValueOnce(
        mockSchool[0].modalities
      );
      addressService.getAddressById.mockResolvedValueOnce(mockSchool[0].Address);

      const response = await request(app)
        .get('/school')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectSchool);
      expect(schoolService.getSchools).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.getSchools.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/school')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getSchoolById', () => {
    it('should return an school by id', async () => {
      const expectSchool = mockSchool[0];
      schoolService.getSchoolById.mockResolvedValueOnce(expectSchool);

      const response = await request(app)
        .get('/school/27036782')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectSchool);
      expect(schoolService.getSchoolById).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.getSchoolById.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/school/27036782')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if school not found', async () => {
      const expectedError = { error: 'Resource not found' };
      schoolService.getSchoolById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/school/27036782')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });
  describe('getSchoolByCity test', () => {
    it('should return an school by city', async () => {
      const expectSchoolCity = mockSchool[0];
      schoolService.getSchoolByCity.mockResolvedValueOnce(expectSchoolCity);

      const response = await request(app)
        .get('/school/city/maceio')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectSchoolCity);
      expect(schoolService.getSchoolByCity).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.getSchoolByCity.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/school/city/maceio')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if city not found', async () => {
      const expectedError = { error: 'Resource not found' };
      schoolService.getSchoolByCity.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/school/city/maceio')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getSchoolByGee test', () => {
    it('should return an school by Gee', async () => {
      const expectSchoolGee = mockSchool[0];
      schoolService.getSchoolByGee.mockResolvedValueOnce(expectSchoolGee);

      const response = await request(app)
        .get('/school/gee/401')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectSchoolGee);
      expect(schoolService.getSchoolByGee).toHaveBeenCalledTimes(1);
    });
    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.getSchoolByGee.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/school/gee/401')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if gee not found', async () => {
      const expectedError = { error: 'Resource not found' };
      schoolService.getSchoolByGee.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/school/gee/401')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('createSchool test', () => {
    it('should create a school', async () => {
      const expectedSchool = mockCreateSchool[0];
      addressService.createAddress.mockResolvedValueOnce(expectedSchool);
      schoolService.createSchool.mockResolvedValueOnce(mockSchool[0].Address);
      school_modalityService.createschool_modality.mockResolvedValueOnce(
        mockSchool[0].modalities
      );
      const response = await request(app)
        .post('/school')
        .send(expectedSchool)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockCreateSchool[1]);
      expect(schoolService.createSchool).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.createSchool.mockRejectedValueOnce(expectedError);
      const response = await request(app)
        .post('/school')
        .send(mockCreateSchool)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(500);
    });
  });

  describe('updateSchool test', () => {
    it('should update a school', async () => {
      const expectedSchool = mockCreateSchool[0];
      schoolService.getSchoolById.mockResolvedValueOnce(expectedSchool)
      addressService.updateAddress.mockResolvedValueOnce(expectedSchool);
      schoolService.updateSchool.mockResolvedValueOnce(mockSchool[0].Address);
      school_modalityService.createschool_modality.mockResolvedValueOnce(
        mockSchool[0].modalities
      );
      const response = await request(app)
        .put('/school/27036782')
        .send(expectedSchool)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCreateSchool[2]);
      expect(schoolService.updateSchool).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.getSchoolById.mockResolvedValueOnce(mockCreateSchool[0]);
      schoolService.updateSchool.mockRejectedValueOnce(expectedError);
      const response = await request(app)
        .put('/school/27036782')
        .send(mockCreateSchool)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(500);
    });

    it('should return an error if school not found', async () => {
      const expectedError = { error: 'Resource not found' };
      schoolService.getSchoolById.mockResolvedValueOnce(null);
      schoolService.updateSchool.mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/school/27036782')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('deleteSchool test', () => {
    it('should delete a school', async () => {
      const expectedSchool = mockCreateSchool[0];
      schoolService.deleteSchool.mockResolvedValueOnce(expectedSchool);
      const response = await request(app)
        .delete('/school/27036782')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'School deleted successfully' });
      expect(schoolService.deleteSchool).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.deleteSchool.mockRejectedValueOnce(expectedError);
      const response = await request(app)
        .delete('/school/27036782')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(500);
    });

    it('should return an error if school not found', async () => {
      const expectedError = { error: 'Resource not found' };
      schoolService.deleteSchool.mockResolvedValueOnce(null);

      const response = await request(app)
        .delete('/school/27036782')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });

  describe('getSchoolInfo test', () => {
    it('should return an school info', async () => {
      const expectSchoolInfo = mockSchool[0];
      schoolService.getSchoolById.mockResolvedValueOnce(expectSchoolInfo);
      school_modalityService.getSchoolModalities.mockResolvedValueOnce(
        mockSchool[0].modalities
      );
      addressService.getAddressById.mockResolvedValueOnce(mockSchool[0].Address);

      const response = await request(app)
        .get('/school/schoolInfo/123')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(update);
      expect(schoolService.getSchoolById).toHaveBeenCalledTimes(1);
    });

    it(TESTING_ERROR, async () => {
      const expectedError = error;
      schoolService.getSchoolById.mockRejectedValueOnce(expectedError);

      const response = await request(app)
        .get('/school/schoolInfo/123')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual(expectedError);
    });

    it('should return an error if school not found', async () => {
      const expectedError = { error: 'Resource not found' };
      schoolService.getSchoolById.mockResolvedValueOnce(null);

      const response = await request(app)
        .get('/school/schoolInfo/123')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expectedError);
    });
  });
});

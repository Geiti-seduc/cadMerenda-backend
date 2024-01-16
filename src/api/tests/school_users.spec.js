/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../../app');
const schoolUserService = require('../services/school_userService');

jest.mock('../controllers/logsController', () => ({
    creationLog: jest.fn(() => console.log('Logs creation created')),
    updateLog: jest.fn(() => console.log('Logs update created')),
    deleteLog: jest.fn(() => console.log('Logs delete created')),
}));

jest.mock('../services/school_userService');

jest.mock('../middleware/loginRequired', () =>
    jest.fn(() => (req, res, next) => {
        req.userId = 'id-ficticio';
        next();
    }));

const token = 'token-ficticio';
const error = { error: 'Internal server error' };
const TESTING_ERROR = 'should return an error';
const mockSchoolUsers = [
    {
        role: 'string',
        school_inep: 'string',
        user_id: 'string'
    },

    {
        role: 'string_better',
        school_inep: 'string_different',
        user_id: 'string_2.0'
    }
];

describe ('School User Controller', () => {

    describe('getSchool_Users', () => {

        it('should return all school users', async () => {
            const usersExpected = mockSchoolUsers;
            schoolUserService.getSchool_Users.mockResolvedValueOnce(usersExpected);

            const response = await request(app)
                .get('/school_user')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(usersExpected);
        });

        it(TESTING_ERROR, async () => {
            schoolUserService.getSchool_Users.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/school_user')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('getSchool_UserById', () => {

        it('should return an user by id', async () => {

            const userExpected = mockSchoolUsers[0];
            schoolUserService.getSchool_UserById.mockResolvedValueOnce(userExpected);

            const response = await request (app)
                .get('/school_user/string')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(userExpected);
        });

        it('should return a error if user not found', async () => {

            const errorExpected = {error: 'Resource not found'};
            schoolUserService.getSchool_UserById.mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/school_user/string_equal')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });

        it(TESTING_ERROR, async () => {

            schoolUserService.getSchool_UserById.mockRejectedValueOnce(error);

            const response = await request(app)
                .get('/school_user/string_error')
                .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('createSchool_User', () => {

        const userCreate = mockSchoolUsers[1];

        it('should create an user', async () => {

            schoolUserService.createSchool_User.mockResolvedValueOnce(userCreate);

            const response = await request(app)
                .post('/school_user')
                .set('Authorization', `Bearer ${token}`)
                .send(userCreate)

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(userCreate);
        });

        it(TESTING_ERROR, async () => {

            schoolUserService.createSchool_User.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/school_user')
                .set('Authorization', `Bearer ${token}`)
                .send(userCreate)

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });
    });

    describe('updateSchool_User', () => {
        
        const userUpdate = mockSchoolUsers[1];
        it('should update a user', async () => {

            schoolUserService.updateSchool_User.mockResolvedValueOnce(userUpdate);

            const response = await request(app)
                .put('/school_user/string')
                .set('Authorization', `Bearer ${token}`)
                .send(userUpdate)

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(userUpdate);
        });

        it(TESTING_ERROR, async () => {

            schoolUserService.updateSchool_User.mockRejectedValueOnce(error);

            const response = await request(app)
                .put('/school_user/string')
                .set('Authorization', `Bearer ${token}`)
                .send(userUpdate)

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return a error if user not found', async () => {

            const errorExpected = {error: 'Resource not found'};
            schoolUserService.updateSchool_User.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/school_user/string_equal')
                .set('Authorization', `Bearer ${token}`)
                .send(userUpdate);
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(errorExpected);
        });
    });

    describe('deleteSchool_User', () => {

        it('should delete a user', async () => {
            
            const messageExpected = { message: 'User deleted successfully' };
            schoolUserService.deleteSchool_User.mockResolvedValueOnce(messageExpected);

            const response = await request(app)
                .delete('/school_user/string')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(messageExpected);
        });

        it(TESTING_ERROR, async () => {

            schoolUserService.deleteSchool_User.mockRejectedValueOnce(error);

            const response = await request(app)
                .delete('/school_user/string')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual(error);
        });

        it('should return a error if user not found', async () => {

            const messageExpected = {message: 'Resource not found'};
            schoolUserService.deleteSchool_User.mockResolvedValueOnce(null);

            const response = await request(app)
                .delete('/school_user/string_equal')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual(messageExpected);
        });
    });
});
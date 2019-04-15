jest.mock('../../database/connect');

import * as dbConnect from '../../database/connect';
import loginUser from '../login-user';

describe('loginUser tests', () => {
    beforeEach(() => {
        const findOneMock = jest.fn(({ username }) => username === 'test' ? Promise.resolve({ password: 'password123' }) : null)
        const collectionMock = jest.fn(() => ({ findOne: findOneMock }))

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });
    });

    it('returns a token if username and password match', async () => {
        const result = await loginUser({ username: 'test', password: 'password123' });

        expect(result.token).toEqual('token');
    });

    it('throws an error if the password is wrong', async () => {
        expect(loginUser({ username: 'test', password: 'notPassword' })).rejects.toEqual(new Error('Incorrect password'));
    });

    it('throws an error if the user is not found', async () => {
        expect(loginUser({ username: 'notTest', password: 'password123' })).rejects.toEqual(new Error('User not found'));
    });
});
jest.mock('../../database/connect');

import * as dbConnect from '../../database/connect';
import registerUser from '../register-user';

describe('registerUser tests', () => {
    it('returns a token if the user could be created', async () => {
        const insertOneMock = jest.fn(() => Promise.resolve({ result: { ok: true } }));
        const findOneMock = jest.fn(({ username }) => username === 'test' ? Promise.resolve({ password: 'password123' }) : null)
        const collectionMock = jest.fn(() => ({ findOne: findOneMock, insertOne: insertOneMock }))

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        const result = await registerUser({ username: 'test2', password: 'password123' });

        expect(result.token).toEqual('token');
    });

    it('throws an error if the user already exists', async () => {
        const findOneMock = jest.fn(({ username }) => username === 'test' ? Promise.resolve({ password: 'password123' }) : null)
        const collectionMock = jest.fn(() => ({ findOne: findOneMock }))

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        expect(registerUser({ username: 'test', password: 'passworf' })).rejects.toEqual(new Error('User already exists.'));
    });

    it('throws an error if it cannot insert the user into the db', async () => {
        const insertOneMock = jest.fn(() => Promise.resolve({ result: { ok: false } }));
        const findOneMock = jest.fn(({ username }) => username === 'test' ? Promise.resolve({ password: 'password123' }) : null)
        const collectionMock = jest.fn(() => ({ findOne: findOneMock, insertOne: insertOneMock }))

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        expect(registerUser({ username: 'test2', password: 'passworf' })).rejects.toEqual(new Error('Could not add new user to database.'));
    });
});
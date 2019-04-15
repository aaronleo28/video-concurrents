jest.mock('../../database/connect');

import * as dbConnect from '../../database/connect'
import checkSessions from '../check-sessions';

describe('checkSessions tests', () => {
    it('throws an error if a user is watching more than 3 concurrent streams', async () => {
        const user = 'test';
        const findOneMock = jest.fn(({ username }) => username === user ? Promise.resolve({ sessions: 4 }) : null)
        const collectionMock = jest.fn(() => ({ findOne: findOneMock }))

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        const ctx = { state: { user: { username: user } } };

        expect(checkSessions()(ctx)).rejects.toEqual(new Error('Can only watch up to 3 concurrent streams'));
    });

    it('returns next if the user is watching less than 3 concurrent streams', async () => {
        const user = 'test';
        const nextMock = jest.fn(() => 'called');
        const findOneMock = jest.fn(({ username }) => username === user ? Promise.resolve({ sessions: 2 }) : null)
        const collectionMock = jest.fn(() => ({ findOne: findOneMock }))

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        const ctx = { state: { user: { username: user } } };

        const result = await checkSessions()(ctx, nextMock);

        expect(nextMock.mock.calls.length).toBe(1);
        expect(result).toEqual('called');
    });
});
jest.mock('../../database/connect');

import * as dbConnect from '../../database/connect';
import socketHelper from '../index';

describe('socketHelper tests', () => {
    it('updates the database when a user connects', async () => {
        const updateOneMock = jest.fn(() => Promise.resolve('updated'));
        const collectionMock = jest.fn(() => ({ updateOne: updateOneMock }));

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        const client = { handshake: { query: { token: 'token' } } };
        const socketUpdated = await socketHelper.onConnect(client);

        expect(updateOneMock.mock.calls.length).toBe(1);
        expect(updateOneMock.mock.calls[0][0]).toEqual({ username: 'user1' });
        expect(updateOneMock.mock.calls[0][1]).toEqual({ $inc: { sessions: 1 } });
        expect(updateOneMock.mock.calls[0][2]).toEqual({ upsert: true });

        expect(socketUpdated).toEqual('updated');
    });

    it('updates the database when a user disconnects', async () => {
        const updateOneMock = jest.fn(() => Promise.resolve('updated'));
        const collectionMock = jest.fn(() => ({ updateOne: updateOneMock }));

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });

        const client = { handshake: { query: { token: 'token' } } };
        const socketUpdated = await socketHelper.onDisconnect(client);

        expect(updateOneMock.mock.calls.length).toBe(1);
        expect(updateOneMock.mock.calls[0][0]).toEqual({ username: 'user1' });
        expect(updateOneMock.mock.calls[0][1]).toEqual({ $inc: { sessions: -1 } });
        expect(updateOneMock.mock.calls[0][2]).toEqual({ upsert: true });

        expect(socketUpdated).toEqual('updated');
    });

    it('updates the database when a user logs out', async () => {
        const updateOneMock = jest.fn(() => Promise.resolve('updated'));
        const collectionMock = jest.fn(() => ({ updateOne: updateOneMock }));

        dbConnect.connect = () => Promise.resolve({
            collection: collectionMock
        });
        
        const username = 'user1';
        const socketUpdated = await socketHelper.onLogout(username);

        expect(updateOneMock.mock.calls.length).toBe(1);
        expect(updateOneMock.mock.calls[0][0]).toEqual({ username });
        expect(updateOneMock.mock.calls[0][1]).toEqual({ $set: { sessions: 0 } });
        expect(updateOneMock.mock.calls[0][2]).toEqual({ upsert: true });

        expect(socketUpdated).toEqual('updated');
    });
});
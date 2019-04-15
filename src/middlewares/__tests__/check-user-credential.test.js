import checkUserCredentials from '../check-user-credentials';

describe('checkUserCredentials tests', () => {
    it('throws an error if an invalid username is supplied', async () => {
        const password = 'password';
        const ctx = { request: { body: { password } } };

        expect(() => checkUserCredentials()(ctx)).toThrow(new Error('invalid username supplied'));
    });

    it('throws an error if an invalid password is supplied', async () => {
        const username = 'user1';
        const ctx = { request: { body: { username } } };

        expect(() => checkUserCredentials()(ctx)).toThrow(new Error('invalid password supplied'));
    });

    it('throws an error if an invalid username is supplied', async () => {
        const username = 'user1';
        const password = 'password';
        const ctx = { request: { body: { username, password } } };
        const nextMock = jest.fn(() => 'called');

        const result = checkUserCredentials()(ctx, nextMock);

        expect(nextMock.mock.calls.length).toBe(1);
        expect(result).toEqual('called');
    });
});

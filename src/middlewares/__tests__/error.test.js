import error from '../error';

describe('error tests', () => {
    it('passes through if there are no errors', async () => {
        const nextMock = jest.fn(() => {});

        error()(null, nextMock);
        
        expect(nextMock.mock.calls.length).toBe(1);
    });

    it('redirects to login if error status is 401', async () => {
        const nextMock = jest.fn(() => {
            const err = new Error();
            err.status = 401;

            throw err;
        });
        const redirectMock = jest.fn(() => 'redirect called');

        const ctx = {
            redirect: redirectMock
        }

        const result = await error()(ctx, nextMock);
        
        expect(nextMock.mock.calls.length).toBe(1);
        expect(redirectMock.mock.calls.length).toBe(1);
        expect(redirectMock.mock.calls[0][0]).toEqual('/login');
        expect(result).toEqual('redirect called');
    });

    it('emits an error', async () => {
        const err = new Error();
        err.status = 418;
        
        const nextMock = jest.fn(() => {
            throw err;
        });
        const emitMock = jest.fn(() => {});

        const ctx = {
            app: { emit: emitMock }
        }

        await error()(ctx, nextMock);
        
        expect(nextMock.mock.calls.length).toBe(1);
        expect(emitMock.mock.calls.length).toBe(1);
        expect(emitMock.mock.calls[0][0]).toEqual('error');
        expect(emitMock.mock.calls[0][1]).toBe(err);
        expect(emitMock.mock.calls[0][2]).toBe(ctx);
    });
});

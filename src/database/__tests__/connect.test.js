import { connect } from '../connect';

describe('connect tests', () => {
    it('returns a database connection', async () => {
        const connection = await connect();

        expect(connection).toEqual('database connection');
    });
});
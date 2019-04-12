import { MongoClient } from 'mongodb';

import config from '../config';

export async function connect() {
    const client = await MongoClient.connect(config.mongoUrl, { useNewUrlParser: true });

    return client.db(config.dbName);
}

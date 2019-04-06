import { MongoClient } from 'mongodb';

import config from '../config';

const connect = async () => {
    const client = await MongoClient.connect(config.mongoUrl, { useNewUrlParser: true });

    return client.db(config.dbName);
}

export default connect;
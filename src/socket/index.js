import jwt from 'jsonwebtoken';

import { connect } from '../database/connect';
import config from '../config';

const onConnect = async client => {
    const { token } = client.handshake.query;

    if (token) {
        const db = await connect();
        const collection = db.collection('users');

        var user = jwt.verify(token, config.jwtTokenSecret);

        return await collection.updateOne({ username: user.username }, { $inc: { sessions: 1 } }, { upsert: true });
    }
};

const onDisconnect = async client => {
    const { token } = client.handshake.query;

    if (token) {
        const db = await connect();
        const collection = db.collection('users');

        var user = jwt.verify(token, config.jwtTokenSecret);

        return await collection.updateOne({ username: user.username }, { $inc: { sessions: -1 } }, { upsert: true });
    }
};

const onLogout = async username => {
    const db = await connect();
    const collection = db.collection('users');

    return await collection.updateOne({ username }, { $set: { sessions: 0 } }, { upsert: true });
}

export default {
    onConnect,
    onDisconnect,
    onLogout
};
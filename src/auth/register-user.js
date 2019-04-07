import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import connect from '../database/connect';

const registerUser = async ({ username, password }) => {
    const db = await connect();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ username });
    
    if (existingUser) {
        throw Error('User already exists.');
    }
    
    const hash = await bcrypt.hash(password, 10);
    const row = await collection.insertOne({ username, password: hash, sessions: 0 });
    
    if (row.result.ok) {
        const token = jwt.sign({ username, password: hash }, config.jwtTokenSecret);

        return { token };
    }
    
    throw Error('Could not add new user to database.');
};

export default registerUser;
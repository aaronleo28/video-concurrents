import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import connect from '../database/connect';

const loginUser = async ({ username, password }) => {
    const db = await connect();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ username });
    
    if (existingUser) {
        const res = await bcrypt.compare(password, existingUser.password);
        
        if (res) {
            const token = jwt.sign({ username, password: existingUser.password }, config.jwtTokenSecret);

            return { token };
        }

        throw Error('Incorrect password');
    }
    
    throw Error('User not found');
};

export default loginUser;
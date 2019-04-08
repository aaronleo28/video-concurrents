import connect from '../database/connect';
import config from '../config';

const checkSessions = () => async (ctx, next) => {
    const db = await connect();
    const collection = db.collection('users');
    const userData = await collection.findOne({ username: ctx.state.user.username });
    
    if (userData && userData.sessions && userData.sessions >= config.maximumNumberOfStreams) {
        throw Error('Can only watch up to 3 concurrent streams');
    }
    
    return next();
};

export default checkSessions;

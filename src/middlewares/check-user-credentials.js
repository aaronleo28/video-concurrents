const checkUserCredentials = () => (ctx, next) => {
    const { username, password } = ctx.request.body;

    if (!username) {
        throw Error('invalid username supplied');
    }

    if (!password) {
        throw Error('invalid password supplied');
    }

    return next();
};

export default checkUserCredentials;

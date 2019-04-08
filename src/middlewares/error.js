const error = () => async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status === 401) {
            return ctx.redirect('/login');
        }

        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
};

export default error;

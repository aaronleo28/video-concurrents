import Router from 'koa-router';

import auth from '../auth';
import middlewares from '../middlewares';

const publicRouter = new Router({ prefix: '/api/v1' });

publicRouter.post('/register', middlewares.checkUserCredentials(), async (ctx, next) => {
    ctx.body = await auth.registerUser(ctx.request.body);    
});

publicRouter.post('/login', middlewares.checkUserCredentials(), async (ctx, next) => {
    ctx.body = await auth.loginUser(ctx.request.body);    
});

export default publicRouter;
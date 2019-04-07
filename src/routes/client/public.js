import Router from 'koa-router';

import auth from '../../auth';
import middlewares from '../../middlewares';
import config from '../../config';

const publicRouter = new Router();

publicRouter.get('/register', async (ctx, next) => {
    await ctx.render('register', { action: '/register/submit' });
});

publicRouter.get('/login', async (ctx, next) => {
  await ctx.render('register', { action: '/login/submit' });
});

publicRouter.post('/register/submit', middlewares.checkUserCredentials(), async (ctx, next) => {
  const { token } = await auth.registerUser(ctx.request.body);

  ctx.cookies.set(config.cookieName, token);
  ctx.redirect('/');
});

publicRouter.post('/login/submit', middlewares.checkUserCredentials(), async (ctx, next) => {
  const { token } = await auth.loginUser(ctx.request.body);
  
  ctx.cookies.set(config.cookieName, token);
  ctx.redirect('/')
});

export default publicRouter;
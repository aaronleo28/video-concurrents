import Router from 'koa-router';

import middlewares from '../../middlewares';
import config from '../../config';
import socket from '../../socket';

const privateRouter = new Router();

privateRouter.get('/stream/:streamId', middlewares.checkSessions(), async (ctx, next) => {
  await ctx.render('video', {
    videoId: ctx.params.streamId,
    token: ctx.cookies.get(config.cookieName)
  });
});

privateRouter.get('/logout', async (ctx, next) => {
  await socket.onLogout(ctx.state.user.username);
  ctx.cookies.set(config.cookieName, '');
  
  ctx.redirect('/login');
});

privateRouter.get('/', async (ctx, next) => {
  await ctx.render('home', {
    user: ctx.state.user,
    streams: config.streams
  });
});

export default privateRouter;
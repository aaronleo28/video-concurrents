import Router from 'koa-router';

const privateRouter = new Router();

privateRouter.get('/video/:videoId', async (ctx, next) => {
    await ctx.render('video', {
        videoId: ctx.params.videoId
      });
});

privateRouter.get('/', async (ctx, next) => {
  await ctx.render('home', {
    user: ctx.state.user
  });
});

export default privateRouter;
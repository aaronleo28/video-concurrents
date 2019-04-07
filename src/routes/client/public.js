import Router from 'koa-router';

const publicRouter = new Router();

publicRouter.get('/', async (ctx, next) => {
    await ctx.render('video', {
        videoId: ctx.params.videoId
      });
});

export default publicRouter;
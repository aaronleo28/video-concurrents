import Router from 'koa-router';

const privateRouter = new Router();

privateRouter.get('/video/:videoId', async (ctx, next) => {
    await ctx.render('video', {
        videoId: ctx.params.videoId
      });
});

export default privateRouter;
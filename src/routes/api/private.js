import Router from 'koa-router';

const privateRouter = new Router({ prefix: '/api/v1' });

privateRouter.get('/video/:videoId', async (ctx, next) => {
    // ctx.body = `Restricted stream ${ctx.params.videoId}`;
    
    await ctx.render('video', {
        videoId: ctx.params.videoId
      });
});

export default privateRouter;
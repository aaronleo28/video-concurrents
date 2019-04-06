import Router from 'koa-router';

const privateRouter = new Router({ prefix: '/api/v1' });

privateRouter.get('/video/:videoId', (ctx, next) => {
    ctx.body = `Restricted stream ${ctx.params.videoId}`;    
});

export default privateRouter;
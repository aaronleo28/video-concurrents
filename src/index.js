import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import jwt from 'koa-jwt';

import config from './config';
import middlewares from './middlewares';
import publicRouter from './routes/public';
import privateRouter from './routes/private';

const app = new Koa();

app
  .use(bodyParser())
  .use(middlewares.error())
  .use(publicRouter.routes())
  .use(jwt({ secret: config.jwtTokenSecret }))
  .use(privateRouter.routes())
  .use(publicRouter.allowedMethods());

console.log(`Listening on port ${config.port}!`);
app.listen(config.port);

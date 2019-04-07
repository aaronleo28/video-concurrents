import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import jwt from 'koa-jwt';
import http from 'http';
import socket from 'socket.io';
import render from 'koa-ejs';
import path from 'path';

import config from './config';
import middlewares from './middlewares';
import publicApiRouter from './routes/api/public';
import privateApiRouter from './routes/api/private';
import publicClientRouter from './routes/client/public';
import privateClientRouter from './routes/client/private';

const app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false
  });

app
  .use(bodyParser())
  .use(middlewares.error())
  .use(publicApiRouter.routes())
  .use(publicClientRouter.routes())
  .use(jwt({ secret: config.jwtTokenSecret, cookie: config.cookieName }))
  .use(privateApiRouter.routes())
  .use(privateClientRouter.routes())
  .use(publicApiRouter.allowedMethods());

const server = http.createServer(app.callback());
const io = socket(server);

io.on('connection', () => { /* … */ });
console.log(`Listening on port ${config.port}!`);
server.listen(3000);

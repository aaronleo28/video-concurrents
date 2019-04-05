import Koa from 'koa';
import config from './config';

const app = new Koa;

app.use(async ctx => {
    ctx.body = 'Hello World';
});

console.log(`Listening on port ${config.port}!`);
app.listen(config.port);
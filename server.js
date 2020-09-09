const fs = require('fs');
const Koa = require('koa');
const send = require('koa-send');
const logger = require('koa-logger');
require('dotenv').config();
const app = new Koa();
const publicPath = __dirname + '/public';

app.use(logger());
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.set('Cache-Control', 'public');
    await send(ctx, '/index.html', { root: publicPath });
  }
});
app.use(async (ctx, next) => {
  await next();
  if (fs.existsSync(publicPath + ctx.path)) {
    ctx.set('Cache-Control', 'public');
    await send(ctx, ctx.path, { root: publicPath });
  }
});
const server = app.listen(process.env.PORT || 8080);
module.exports = server;

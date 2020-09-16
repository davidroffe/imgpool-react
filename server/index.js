import fs from 'fs';
import Koa from 'koa';
import send from 'koa-send';
import logger from 'koa-logger';
import { handleRender } from './react';
import { config } from 'dotenv';

const app = new Koa();
const publicPath = __dirname + '/../public';
config();

app.use(logger());
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    return handleRender(ctx);
  }
});
app.use(async (ctx, next) => {
  await next();
  if (fs.existsSync(publicPath + ctx.path)) {
    ctx.set('Cache-Control', 'public');
    await send(ctx, ctx.path, { root: publicPath });
  }
});
app.listen(process.env.PORT || 8080);

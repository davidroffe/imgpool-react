import fs from 'fs';
import path from 'path';
import axios from 'axios';
import Koa from 'koa';
import send from 'koa-send';
import logger from 'koa-logger';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import imgpoolApp from './app/reducers';
import App from './app/components/App';
import { config } from 'dotenv';

const app = new Koa();
const publicPath = __dirname + '/../public';
config();

function getPosts() {
  return axios.get(`${process.env.API_HOST}/api/post/list?searchQuery=&page=1`);
}

function getData() {
  return getPosts().then((res) => {
    const preloadedState = { posts: { page: 1, init: true } };

    if (res.data.hasOwnProperty('list') && res.data.list.length > 0) {
      preloadedState.posts = {
        ...preloadedState.posts,
        ...res.data,
      };
    } else {
      return {};
    }

    return preloadedState;
  });
}

function handleRender(ctx) {
  return getData().then((preloadedState) => {
    const store = createStore(imgpoolApp, preloadedState);
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const finalState = store.getState();
    const indexFile = path.resolve('./public/index.html');
    const promise = fs.promises
      .readFile(indexFile, 'utf8')
      .then((file) => {
        ctx.set('Cache-Control', 'public');

        ctx.body = file.replace(
          '<section id="root"></section>',
          `<section id="root">${html}</section>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(
              /</g,
              '\\u003c'
            )}
        </script>
        `
        );
      })
      .catch((err) => {
        console.error('Something went wrong:', err);
        ctx.throw(500, 'Oops, better luck next time!');
      });

    return promise;
  });
}
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

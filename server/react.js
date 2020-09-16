import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import imgpoolApp from '../app/reducers';
import App from '../app/components/App';
import routes from './routes';

function getData(ctx) {
  const promises = [];
  routes.some((route) => {
    const match = matchPath(ctx.url, route);
    if (match) promises.push(route.loadData(match));
    return match;
  });

  return Promise.all(promises).then((data) => {
    let preloadedState = {};

    data.forEach((state) => {
      preloadedState = { ...preloadedState, ...state };
    });

    return preloadedState;
  });
}

export function handleRender(ctx) {
  return getData(ctx).then((preloadedState) => {
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

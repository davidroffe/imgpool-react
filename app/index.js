import React from 'react';
import { hydrate } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';
import './index.less';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState);

delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

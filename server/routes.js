import loadData from './loadData';

export default [
  {
    path: '/posts',
    exact: true,
    loadData,
  },
  {
    path: '/post/:id',
    exact: true,
    loadData,
  },
  {
    path: '/user/:id',
    exact: true,
    loadData,
  },
  {
    path: '/flags',
    exact: true,
    loadData,
  },
];

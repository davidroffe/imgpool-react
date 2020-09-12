import axios from 'axios';

export default (route) => {
  switch (route.url) {
    case '/posts':
      return axios
        .get(`${process.env.API_HOST}/api/post/list?searchQuery=&page=1`)
        .then((res) => {
          return { posts: { ...res.data, page: 1, init: true } };
        });
    case '/post/:id':
      return axios.get(
        `${process.env.API_HOST}/api/post/single?id=${route.params.id}`
      );
    case '/user/:id':
      return axios.get(
        `${process.env.API_HOST}/api/user/get/${route.params.id}`
      );
    case '/flags':
      return axios
        .get(`${process.env.API_HOST}/api/post/flag/list`)
        .then((res) => {
          return {
            flags: res.data,
          };
        });
    default:
      return new Promise((resolve) => {
        resolve();
      });
  }
};

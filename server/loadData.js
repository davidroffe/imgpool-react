import axios from 'axios';
import { getTagsFromPosts } from '../app/utils/tags';

export default (route) => {
  switch (route.path) {
    case '/posts':
      return axios
        .get(`${process.env.API_HOST}/api/post/list?searchQuery=&page=1`)
        .then((res) => {
          return {
            posts: { ...res.data, page: 1, init: true, loading: false },
            tags: getTagsFromPosts(res.data.list),
          };
        });
    case '/post/:id':
      return axios
        .get(`${process.env.API_HOST}/api/post/single?id=${route.params.id}`)
        .then((res) => {
          return { post: res.data, tags: getTagsFromPosts([res.data]) };
        });
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

import axios from 'axios';

export default {
  search: (searchQuery, page) => {
    const url = searchQuery.length ? '/api/post/search' : '/api/post/list';

    return axios.get(url, { params: { searchQuery, page } });
  },
};

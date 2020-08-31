export default {
  search: (searchQuery, page) => {
    const url = searchQuery.length ? '/api/post/search' : '/api/post/list';
    const urlSearchParams = new URLSearchParams({ searchQuery, page });

    return fetch(`${url}?${urlSearchParams}`, {
      method: 'GET',
    }).then((res) => res.json());
  },
};

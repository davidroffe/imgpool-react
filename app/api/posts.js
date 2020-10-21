export const fetchPosts = (searchQuery, page, postsPerPage) => {
  const url = searchQuery.length ? '/api/post/search' : '/api/post/list';
  const urlSearchParams = new URLSearchParams({
    searchQuery,
    page,
    postsPerPage,
  });

  return fetch(`${url}?${urlSearchParams}`, {
    method: 'GET',
  }).then((res) => res.json());
};

export const fetchPost = (id) => {
  const url = '/api/post/single';
  const urlSearchParams = new URLSearchParams({
    id: id,
  });

  return fetch(`${url}?${urlSearchParams}`, {
    method: 'GET',
  }).then((res) => res.json());
};

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

export default {
  deletePost: (id) => {
    const url = `/api/post/delete/${id}`;

    return fetch(url, {
      method: 'POST',
    })
      .then((res) => res.text())
      .then((res) => {
        try {
          return JSON.parse(res);
        } catch (error) {
          throw res;
        }
      });
  },
  createPost: (newPost) => {
    const url = '/api/post/create';
    const formData = new FormData();
    const urlSearchParams = new URLSearchParams({
      source: newPost.source,
      tags: newPost.tags,
    });
    formData.append('image', newPost.file.value);
    return fetch(`${url}?${urlSearchParams}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((res) => {
        try {
          return JSON.parse(res);
        } catch (error) {
          throw res;
        }
      });
  },
};

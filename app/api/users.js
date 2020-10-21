export default {
  setFavorite: (id) => {
    const url = '/api/post/favorite';
    const urlSearchParams = new URLSearchParams({ postId: id });

    return fetch(`${url}?${urlSearchParams}`, {
      method: 'POST',
    }).then((res) => res.json());
  },
};

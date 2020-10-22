export default {
  getUser: (id) => {
    const url = `/api/user/get/${id}`;

    return fetch(url, { method: 'GET' }).then((res) => res.json());
  },
  setFavorite: (id) => {
    const url = '/api/post/favorite';
    const urlSearchParams = new URLSearchParams({ postId: id });

    return fetch(`${url}?${urlSearchParams}`, {
      method: 'POST',
    }).then((res) => res.json());
  },
  toggleAccountStatus: (user) => {
    const url = `/api/user/${user.active ? 'disable' : 'enable'}/${user.id}`;

    return fetch(url, {
      method: 'POST',
    }).then((res) => res.json());
  },
};

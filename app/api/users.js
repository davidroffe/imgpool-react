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
  resetPassword: (id, password, passwordResetToken) => {
    const url = `/api/user/password-reset/${id || ''}`;
    const urlSearchParams = new URLSearchParams({
      passwordResetToken,
      password,
    });
    return fetch(id ? url : `${url}?${urlSearchParams}`, {
      method: 'POST',
    }).then((res) => {
      if (res.status !== 200) {
        throw res.statusText;
      } else {
        return res.json();
      }
    });
  },
  logout: () => {
    return fetch('/api/user/logout', { method: 'POST' });
  },
};

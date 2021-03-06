export default {
  getCurrent: () => {
    return fetch('/api/user/get/current', { method: 'POST' }).then((res) =>
      res.json()
    );
  },
  getUser: (id) => {
    const url = `/api/user/get/${id}`;

    return fetch(url, { method: 'GET' }).then((res) => res.json());
  },
  getUsers: () => {
    return fetch('/api/user/get', { method: 'GET' }).then((res) => res.json());
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
  forgotPassword: (email) => {
    const url = '/api/user/password-reset';
    const urlSeachParams = new URLSearchParams({
      email: email,
    });
    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    }).then((res) => {
      if (res.status === 500) {
        throw 'Server error.';
      } else {
        return 'An email has been sent.';
      }
    });
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
  signup: (email, username, password, passwordConfirm) => {
    const url = '/api/user/signup';
    const recaptchaResponse = window.grecaptcha.getResponse();
    const urlSeachParams = new URLSearchParams({
      email: email,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      recaptchaResponse,
    });

    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    })
      .then((res) => res.text())
      .then((res) => {
        try {
          return (res = JSON.parse(res));
        } catch (error) {
          throw res;
        }
      });
  },
  login: (email, password) => {
    const url = '/api/user/login';
    const urlSeachParams = new URLSearchParams({
      email,
      password,
    });

    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    })
      .then((res) => res.text())
      .then((res) => {
        try {
          return (res = JSON.parse(res));
        } catch (error) {
          throw res;
        }
      });
  },
  logout: () => {
    return fetch('/api/user/logout', { method: 'POST' });
  },
};

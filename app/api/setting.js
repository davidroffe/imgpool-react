export default {
  signup: () => {
    return fetch('/api/setting/signup', { method: 'GET' }).then((res) =>
      res.json()
    );
  },
  toggleSignup: () => {
    const url = '/api/setting/signup/toggle';

    return fetch(url, {
      method: 'post',
    }).then((res) => res.json());
  },
};

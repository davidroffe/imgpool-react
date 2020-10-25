export default {
  signup: () => {
    return fetch('/api/setting/signup', { method: 'GET' }).then((res) =>
      res.json()
    );
  },
};

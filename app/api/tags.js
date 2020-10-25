export default {
  fetchTags: () => {
    return fetch('/api/tag/get', { method: 'GET' }).then((res) => res.json());
  },
};

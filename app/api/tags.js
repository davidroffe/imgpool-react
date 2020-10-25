export default {
  fetchTags: () => {
    return fetch('/api/tag/get', { method: 'GET' }).then((res) => res.json());
  },
  toggleTagState: (url, tagIds) => {
    const urlSearchParams = new URLSearchParams({ tagIds });

    return fetch(`${url}?${urlSearchParams}`, {
      method: 'post',
    });
  },
};

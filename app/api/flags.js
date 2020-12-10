export default {
  getFlags: () => {
    return fetch('/api/post/flag/list', { method: 'GET' }).then((res) =>
      res.json()
    );
  },
  createPostFlag: (postId, reason) => {
    const url = '/api/post/flag/create';
    const urlSearchParams = new URLSearchParams({
      postId,
      reason,
    });

    return fetch(`${url}?${urlSearchParams}`, {
      method: 'POST',
    }).then((res) => res.json());
  },
};

export default {
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

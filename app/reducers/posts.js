const posts = (
  state = { list: [], page: 1, totalCount: 0, init: false },
  action
) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts;
    case 'SET_POSTS_LIST':
      return { ...state, list: action.posts };
    default:
      return state;
  }
};

export default posts;

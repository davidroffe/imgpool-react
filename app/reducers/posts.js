const initialState = {
  list: [],
  page: 1,
  totalCount: 0,
  loading: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts;
    case 'SET_POSTS_LIST':
      return { ...state, list: action.posts };
    case 'SET_POSTS_LOADING':
      return { ...state, loading: action.state };
    case 'SET_PAGE':
      return { ...state, page: action.page };
    default:
      return state;
  }
};

export default posts;

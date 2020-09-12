const initialState = {
  id: '',
  tag: [],
  user: {
    id: '',
    username: '',
  },
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POST':
      return action.post;
    default:
      return state;
  }
};

export default post;

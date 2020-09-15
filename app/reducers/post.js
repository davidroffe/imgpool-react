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
    case 'CLEAR_POST':
      return initialState;
    default:
      return state;
  }
};

export default post;

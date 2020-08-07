const initialState = {
  tags: false,
  postOptions: false,
};
const menus = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAGS_MENU':
      return { ...state, tags: action.state };
    case 'SET_POST_OPTIONS_MENU':
      return { ...state, postOptions: action.state };
    default:
      return state;
  }
};

export default menus;

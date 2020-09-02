const initialState = {
  tags: false,
  postOptions: false,
};
const menus = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAGS_MENU':
      return { ...initialState, tags: action.state };
    case 'SET_POST_OPTIONS_MENU':
      return { ...initialState, postOptions: action.state };
    case 'CLOSE_ALL_MENUS':
      return initialState;
    default:
      return state;
  }
};

export default menus;

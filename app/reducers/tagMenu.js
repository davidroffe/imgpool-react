const tagMenu = (state = false, action) => {
  switch (action.type) {
    case 'SET_TAG_MENU':
      return action.state;
    default:
      return state;
  }
};

export default tagMenu;

export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts: { ...posts, init: true },
});

export const setTags = (tags) => ({
  type: 'SET_TAGS',
  tags,
});

export const setUsers = (users) => ({
  type: 'SET_USERS',
  users,
});

export const setFlags = (flags) => ({
  type: 'SET_FLAGS',
  flags,
});

export const toggleTag = (tag) => ({
  type: 'TOGGLE_TAG',
  id: tag.id,
});

export const setSearch = (text) => ({
  type: 'SET_SEARCH',
  text,
});

export const closeAllMenus = () => ({
  type: 'CLOSE_ALL_MENUS',
});

export const closeAllMenusExcept = (menu) => setMenu(menu, true);

export const setMenu = (menu, state) => ({
  type: `SET_${menu.toUpperCase()}`,
  state,
});

export const setUser = (field, value) => ({
  type: `SET_${field.toUpperCase()}`,
  value,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

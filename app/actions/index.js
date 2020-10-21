import { fetchPosts } from '../api/posts';

const postsPerPage = process.env.POSTS_PER_PAGE;

export function setTagsFromExistingPosts() {
  return function(dispatch, getState) {
    const posts = getState().posts.list;
    const searchQuery = getState().search;

    dispatch(setTags(getTagsFromPosts(posts, searchQuery)));
  };
}

function getTagsFromPosts(posts, searchQuery) {
  let newTags = [];
  let exists;

  if (posts[0]) {
    for (var i = 0; i < posts.length; i++) {
      for (var j = 0; j < posts[i].tag.length; j++) {
        exists = false;
        let tag = posts[i].tag[j];

        for (var k = 0; k < newTags.length; k++) {
          if (newTags[k].id === tag.id) {
            exists = true;
          }
        }

        if (!exists) {
          if (searchQuery !== undefined)
            tag.active = searchQuery.indexOf(tag.name) > -1;
          newTags.push(tag);
        }
      }
    }
  }
  return newTags;
}

export const clearPost = () => ({
  type: 'CLEAR_POST',
});

export function fetchPost(id) {
  return function(dispatch) {
    const url = '/api/post/single';
    const urlSearchParams = new URLSearchParams({
      id: id,
    });

    dispatch(clearPost());
    return fetch(`${url}?${urlSearchParams}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setPost(res));
        dispatch(setTags(getTagsFromPosts([res])));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getPosts(
  { newSearchQuery, newPage } = {
    newSearchQuery: undefined,
    newPage: undefined,
  }
) {
  return function(dispatch, getState) {
    const page = isNaN(newPage) ? 1 : newPage;
    const searchQuery =
      typeof newSearchQuery === 'string' ? newSearchQuery : getState().search;

    dispatch(setPage(page));
    dispatch(setPostsLoading(true));

    fetchPosts(searchQuery, page, postsPerPage).then((res) => {
      const newPosts = res.list.length
        ? {
            list: res.list,
            page,
            totalCount: res.totalCount,
            loading: false,
          }
        : { list: [false], page: 1, totalCount: 0, loading: false };

      dispatch(setSearch(searchQuery));
      dispatch(setPosts(newPosts));
      dispatch(setTags(getTagsFromPosts(newPosts.list, searchQuery)));
    });
  };
}

export const signUp = (email, username, password, passwordConfirm) => (
  dispatch
) => {
  const recaptchaResponse = window.grecaptcha.getResponse();
  const url = '/api/user/signup';
  const newErrorMessage = [];

  if (email === undefined || email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (password === undefined || password === '') {
    newErrorMessage.push('Please enter a password.');
  }
  if (password !== passwordConfirm) {
    newErrorMessage.push('Passwords do not match.');
  }
  if (password.length < 8) {
    newErrorMessage.push('Password must be at least 8 characters.');
  }
  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    const urlSeachParams = new URLSearchParams({
      email: email,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      recaptchaResponse,
    });
    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    })
      .then((res) => res.text())
      .then((res) => {
        try {
          const user = JSON.parse(res);

          dispatch(setUser('email', user.email));
          dispatch(setUser('username', user.username));
          dispatch(setUser('loggedIn', true));
          dispatch(setUser('admin', user.admin));
        } catch (error) {
          throw res;
        }
      });
  }
};

export const login = (email, password) => (dispatch) => {
  let newErrorMessage = [];
  const url = '/api/user/login';

  if (email === undefined || email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (password === undefined || password === '') {
    newErrorMessage.push('Please enter a password.');
  }
  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    const urlSeachParams = new URLSearchParams({
      email: email,
      password: password,
    });
    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    })
      .then((res) => res.text())
      .then((res) => {
        try {
          const user = JSON.parse(res);

          dispatch(setUser('email', user.email));
          dispatch(setUser('username', user.username));
          dispatch(setUser('loggedIn', true));
          dispatch(setUser('admin', user.admin));
        } catch (error) {
          throw res;
        }
      });
  }
};

export const resetPassword = (email) => () => {
  const newErrorMessage = [];
  const url = '/api/user/password-reset';

  if (email === undefined || email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    const urlSeachParams = new URLSearchParams({
      email: email,
    });
    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    });
  }
};

export const setPostsLoading = (state) => {
  return {
    type: 'SET_POSTS_LOADING',
    state,
  };
};

export const setPage = (page) => ({
  type: 'SET_PAGE',
  page,
});

export const setPost = (post) => ({
  type: 'SET_POST',
  post: { ...post },
});

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

const setSearch = (text) => ({
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

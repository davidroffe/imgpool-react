import { fetchPosts, fetchPost } from '../api/posts';
import postApi from '../api/posts';
import { getTagsFromPosts } from '../utils/tags';
import userApi from '../api/users';
import flagApi from '../api/flags';
import validate from '../utils/validate';

const postsPerPage = process.env.POSTS_PER_PAGE;

export function setTagsFromExistingPosts() {
  return function(dispatch, getState) {
    const posts = getState().posts.list;
    const searchQuery = getState().search;

    dispatch(setTags(getTagsFromPosts(posts, searchQuery)));
  };
}

export const clearPost = () => ({
  type: 'CLEAR_POST',
});

export function getPost(id) {
  return async function(dispatch) {
    dispatch(clearPost());

    const res = await fetchPost(id);

    dispatch(setPost(res));
    dispatch(setTags(getTagsFromPosts([res])));
  };
}

export const deletePost = (id) => async (dispatch) => {
  const res = await postApi.deletePost(id);

  dispatch(setUser('favorites', res.favorites));
  dispatch(setPosts({ posts: [], page: 1, totalCount: 0 }));
  dispatch(setTags([]));
};

export function getPosts(
  { newSearchQuery, newPage } = {
    newSearchQuery: undefined,
    newPage: undefined,
  }
) {
  return async function(dispatch, getState) {
    const page = isNaN(newPage) ? 1 : newPage;
    const searchQuery =
      typeof newSearchQuery === 'string' ? newSearchQuery : getState().search;

    dispatch(setPage(page));
    dispatch(setPostsLoading(true));

    const res = await fetchPosts(searchQuery, page, postsPerPage);
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
  };
}

export const createNewPost = (newPost) => async (dispatch) => {
  const newErrorMessage = validate.createPostForm(newPost);

  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    await postApi.createPost(newPost);
    dispatch(setPosts({ list: [], page: 1, totalCount: 0 }));
  }
};

export const signUp = (email, username, password, passwordConfirm) => async (
  dispatch
) => {
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
    const user = await userApi.signup(
      email,
      username,
      password,
      passwordConfirm
    );

    dispatch(setUser('email', user.email));
    dispatch(setUser('username', user.username));
    dispatch(setUser('loggedIn', true));
    dispatch(setUser('admin', user.admin));
  }
};

export const login = (email, password) => async (dispatch) => {
  let newErrorMessage = [];

  if (email === undefined || email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (password === undefined || password === '') {
    newErrorMessage.push('Please enter a password.');
  }
  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    const user = await userApi.login(email, password);

    dispatch(setUser('email', user.email));
    dispatch(setUser('username', user.username));
    dispatch(setUser('loggedIn', true));
    dispatch(setUser('admin', user.admin));
  }
};

export const getCurrentUser = () => async (dispatch) => {
  let res = await userApi.getCurrent();

  if (res.valid) {
    dispatch(setUser('id', res.id));
    dispatch(setUser('username', res.username));
    dispatch(setUser('email', res.email));
    dispatch(setUser('bio', res.bio));
    dispatch(setUser('loggedIn', true));
    dispatch(setUser('admin', res.admin));
    dispatch(setUser('favorites', res.favorites));
    dispatch(setUser('init', true));
  } else {
    dispatch(clearUser());
  }
};

export const forgotPassword = (email) => async () => {
  const newErrorMessage = [];

  if (email === undefined || email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    return await userApi.forgotPassword(email);
  }
};

export const resetPassword = (
  id,
  password = null,
  passwordConfirm = null,
  passwordResetToken = null
) => (dispatch) => {
  const editAccount = {
    field: 'edit-password',
    password,
    passwordConfirm,
  };
  const newErrorMessage = validate.editForm(editAccount, null, null);

  if (!id && newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    return userApi
      .resetPassword(id, password, passwordResetToken)
      .then((res) => {
        if (!id) {
          dispatch(setUser('email', res.email));
          dispatch(setUser('username', res.username));
          dispatch(setUser('loggedIn', true));
        }
      });
  }
};

export const editUser = (id, editAccount, email, username) => (dispatch) => {
  const url = '/api/user/edit/' + (id || '');
  const urlSearchParams = new URLSearchParams({
    currentEmail: email,
    editField: editAccount.field,
    email: editAccount.email,
    username: editAccount.username,
    bio: editAccount.bio,
    password: editAccount.password,
    passwordConfirm: editAccount.passwordConfirm,
  });

  const newErrorMessage = validate.editForm(editAccount, email, username);

  if (newErrorMessage.length > 0) {
    return new Promise((resolve, reject) => reject(newErrorMessage));
  } else {
    return fetch(`${url}?${urlSearchParams}`, {
      method: 'post',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success' && id !== null) {
          dispatch(setUser('email', res.email));
          dispatch(setUser('username', res.username));
          dispatch(setUser('bio', res.bio));
        }
        return res;
      });
  }
};

export const getFlags = () => (dispatch) => {
  flagApi.getFlags().then((res) => {
    if (res.length) {
      dispatch(
        setFlags(
          res.map((flag) => {
            return {
              ...flag,
              date: new Date(flag.createdAt).toLocaleDateString(),
              active: flag.post.active,
              user: { id: flag.userId, username: flag.user.username },
            };
          })
        )
      );
    } else {
      dispatch(
        setFlags([
          {
            id: 0,
            postId: 0,
            date: '',
            user: { id: 0, username: '' },
            active: true,
            reason: '',
          },
        ])
      );
    }
  });
};

export const setFlags = (flags) => ({
  type: 'SET_FLAGS',
  flags,
});

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

export const createPostFlag = (postId, reason) => () => {
  return flagApi.createPostFlag(postId, reason);
};

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

export const setFavorite = (id) => (dispatch) => {
  return userApi.setFavorite(id).then((res) => {
    dispatch(setUser('favorites', res.favorites));
  });
};

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

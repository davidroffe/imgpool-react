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

export function fetchPosts(
  { newSearchQuery, newPage } = {
    newSearchQuery: undefined,
    newPage: undefined,
  }
) {
  return function(dispatch, getState) {
    const page = isNaN(newPage) ? 1 : newPage;
    const searchQuery =
      typeof newSearchQuery === 'string' ? newSearchQuery : getState().search;
    const url = searchQuery.length ? '/api/post/search' : '/api/post/list';
    const urlSearchParams = new URLSearchParams({ searchQuery, page });

    dispatch(setPage(page));
    dispatch(setPostsLoading(true));

    return fetch(`${url}?${urlSearchParams}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
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

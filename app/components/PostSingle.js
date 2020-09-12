import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUser,
  setPost,
  setPosts,
  setMenu,
  setTags,
  closeAllMenusExcept,
} from '../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import TagMenu from './TagMenu';
import FlagPost from './FlagPost';
import tagUtil from '../utils/tags';
import Loader from './Utility/Loader';

const mapStateToProps = (state) => {
  return {
    post: state.post,
    userId: state.user.id,
    isAdmin: state.user.admin,
    userFavorites: state.user.favorites,
    optionsMenu: state.menus.postOptions,
  };
};

export const PostSingle = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flagPost, setFlagPost] = useState({
    show: false,
    reason: '',
  });
  useEffect(() => {
    if (props.post.id === '' || props.post.id != props.match.params.id) {
      const url = '/api/post/single';
      const urlSearchParams = new URLSearchParams({
        id: props.match.params.id,
      });

      setIsLoading(true);

      fetch(`${url}?${urlSearchParams}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          props.dispatch(setPost(res));
          props.dispatch(setTags(tagUtil.getTagsFromPosts([res])));
        })
        .catch((err) => {
          console.log(err);
          props.history.push('/404');
        });
    }
  }, []);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const url = '/api/post/favorite';
    const urlSearchParams = new URLSearchParams({ postId: props.post.id });

    fetch(`${url}?${urlSearchParams}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(
          `Post ${isFavorited() ? 'removed from' : 'added to'} favorites.`
        );
        props.dispatch(setUser('favorites', res.favorites));
      });
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();

    props.dispatch(closeAllMenusExcept('POST_OPTIONS_MENU'));
  };

  const toggleOptionsMenu = (e) => {
    e.stopPropagation();
    props.dispatch(setMenu('POST_OPTIONS_MENU', !props.optionsMenu));
  };

  const isFavorited = () => {
    for (let i = 0; i < props.userFavorites.length; i++) {
      if (props.userFavorites[i].id === props.post.id) return true;
    }
    return false;
  };

  const deletePost = (e) => {
    e.preventDefault();
    const url = `/api/post/delete/${props.post.id}`;

    fetch(url, {
      method: 'POST',
    })
      .then(() => {
        toast.success('Post deleted.');
        props.dispatch(setPosts({ posts: [], page: 1, totalCount: 0 }));
        props.dispatch(setTags([]));
        props.history.push('/posts');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleFlagPostChange = (e) => {
    let newObject;

    newObject = { ...flagPost, reason: e.target.value };
    setFlagPost(newObject);
  };

  const handleFlagPostSubmit = (e) => {
    e.preventDefault();

    let newErrorMessage = [];

    if (flagPost.reason === undefined || flagPost.reason === '') {
      newErrorMessage.push('Please enter a reason to flag this post.');
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        toast.error(error);
      });
    } else {
      const url = '/api/post/flag/create';
      const urlSearchParams = new URLSearchParams({
        postId: props.post.id,
        reason: flagPost.reason,
      });

      fetch(`${url}?${urlSearchParams}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'success') {
            setFlagPost({
              show: false,
              reason: '',
            });
            toast.success('Post flagged.');
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const clearFlagPost = () => {
    setFlagPost({ show: false, reason: '' });
  };

  return (
    <section className="container" id="post-single">
      <Loader show={isLoading} />
      <ToastContainer />
      <TagMenu />
      <div className="image-container">
        <div className="inner">
          {!isLoading ? (
            <div className="post-info">
              {props.userId ? (
                <div>
                  <button
                    className="toggle-options"
                    onClick={toggleOptionsMenu}
                  >
                    options <span>+</span>
                  </button>
                  <ul
                    className={`options${props.optionsMenu ? ' active' : ''}`}
                    onClick={handleMenuClick}
                  >
                    <li>
                      <button
                        className={`toggle-fav${
                          isFavorited() ? ' favorited' : ''
                        }`}
                        onClick={toggleFavorite}
                      >
                        <span className="icon">&hearts;</span>
                        <span className="text add">add to favorites</span>
                        <span className="text remove">
                          remove from favorites
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="flag-post"
                        onClick={() => {
                          setFlagPost({ ...flagPost, show: true });
                        }}
                      >
                        <span className="icon flag">&#9873;</span>
                        <span className="text">flag post</span>
                      </button>
                    </li>
                    {props.post.userId === props.userId || props.isAdmin ? (
                      <li>
                        <button className="delete-post" onClick={deletePost}>
                          <span className="icon x">×</span>
                          <span className="text">delete post</span>
                        </button>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              <p className="poster">
                posted by:{' '}
                <Link to={`/user/${props.post.user.id}`}>
                  {props.post.user.username}
                </Link>
              </p>
            </div>
          ) : null}
          <img onLoad={() => setIsLoading(false)} src={props.post.url} />
        </div>
      </div>
      <FlagPost
        handleSubmit={handleFlagPostSubmit}
        handleChange={handleFlagPostChange}
        clearValues={clearFlagPost}
        data={flagPost}
      />
    </section>
  );
};

PostSingle.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userFavorites: PropTypes.array.isRequired,
  optionsMenu: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PostSingle);

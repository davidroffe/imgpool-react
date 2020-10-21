import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUser,
  getPost,
  setPosts,
  setMenu,
  setTags,
  closeAllMenusExcept,
} from '../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import PostOptionsMenu from './PostOptionsMenu';
import TagMenu from './TagMenu';
import FlagPost from './FlagPost';
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

export const PostSingle = ({
  dispatch,
  match,
  post,
  optionsMenu,
  userFavorites,
  history,
  userId,
  isAdmin,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flagPost, setFlagPost] = useState({
    show: false,
    reason: '',
  });
  useEffect(() => {
    if (isNaN(match.params.id)) {
      history.push('/404');
      return;
    }
    if (post.id === '' || post.id != match.params.id) {
      setIsLoading(true);
      dispatch(getPost(match.params.id)).catch(() => {
        history.push('/404');
      });
    }
  }, []);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const url = '/api/post/favorite';
    const urlSearchParams = new URLSearchParams({ postId: post.id });

    fetch(`${url}?${urlSearchParams}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(
          `Post ${isFavorited() ? 'removed from' : 'added to'} favorites.`
        );
        dispatch(setUser('favorites', res.favorites));
      });
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();

    dispatch(closeAllMenusExcept('POST_OPTIONS_MENU'));
  };

  const toggleOptionsMenu = (e) => {
    e.stopPropagation();
    dispatch(setMenu('POST_OPTIONS_MENU', !optionsMenu));
  };

  const isFavorited = () => {
    for (let i = 0; i < userFavorites.length; i++) {
      if (userFavorites[i].id === post.id) return true;
    }
    return false;
  };

  const deletePost = (e) => {
    e.preventDefault();
    const url = `/api/post/delete/${post.id}`;

    fetch(url, {
      method: 'POST',
    })
      .then(() => {
        toast.success('Post deleted.');
        dispatch(setPosts({ posts: [], page: 1, totalCount: 0 }));
        dispatch(setTags([]));
        history.push('/posts');
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
        postId: post.id,
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
              {userId ? (
                <PostOptionsMenu
                  toggleMenu={toggleOptionsMenu}
                  optionsMenu={optionsMenu}
                  handleMenuClick={handleMenuClick}
                  isFavorited={isFavorited()}
                  toggleFavorite={toggleFavorite}
                  setFlagPost={setFlagPost}
                  flagPost={flagPost}
                  deletePost={deletePost}
                  isUploader={post.userId === userId}
                  isAdmin={isAdmin}
                />
              ) : (
                <div />
              )}
              <p className="poster">
                posted by:{' '}
                <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
              </p>
            </div>
          ) : null}
          <img onLoad={() => setIsLoading(false)} src={post.url} />
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  setFavorite,
  deletePost,
  getPost,
  setMenu,
  createPostFlag,
  closeAllMenusExcept,
} from '../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import PostOptionsMenu from './PostOptionsMenu';
import TagMenu from './TagMenu';
import FlagPost from './FlagPost';
import Loader from './Utility/Loader';

const PostSingleContainer = styled.section`
  &.container {
    padding: 50px;
  }
  
  .image-container {
    margin: 5% auto 0;
    text-align: center;

    .inner {
      display: inline-block;
      position: relative;

      .post-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

        .toggle-options {
          border: none;
          padding: 0;
          background: none;
          font-family: sans-serif;
          font-size: 1.2rem;
          text-transform: uppercase;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          outline: none;

          span {
            position: relative;
            top: -1px;
          }
        }
        .options {
          display: none;
          position: absolute;
          left: -5px;
          top: 18px;
          width: 200px;
          padding: 10px 15px;
          list-style: none;
          background-color: #fff;
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          text-align: left;

          &.active {
            display: block;
          }
          button {
            padding: 8px 0;
            font-family: sans-serif;
            font-size: 1rem;
            text-transform: uppercase;
            font-weight: 600;
            color: #333;
            cursor: pointer;
            outline: none;
            border: none;
            background: none;

            .icon {
              display: inline-block;
              width: 15px;
              margin-right: 5px;
              font-size: 1.2rem;
              color: #333;
              line-height: 0;

              &.flag {
                font-size: 1.6rem;
              }
              &.x {
                font-size: 1.6rem;
              }
            }
            .text {
              position: relative;
              top: -1px;
              border-bottom: 3px solid transparent;

              &:hover {
                border-bottom-color: #333;
              }
            }

            &.toggle-fav {
              &.favorited {
                .icon {
                  color: #ff0800;
                }
                .add {
                  display: none;
                }
                .remove {
                  display: inline;
                }
              }
              .remove {
                display: none;
              }
            }
          }
        }
        .poster {
          color: #333;

          a {
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: 600;
            color: #333;
            border-bottom: 3px solid transparent;

            &:hover {
              border-bottom-color: #333;
            }
          }
        }
      }
      img {
        max-width: 100%;
      }
    }
  }

  .tags {
    margin-top: 10px;
    text-align: center;

    .tag {
      margin-right: 5px;
      border: none;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fffef2;
      cursor: pointer;
      outline: none;
    }
  }
`;

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

    dispatch(setFavorite(post.id)).then(() => {
      toast.success(
        `Post ${isFavorited() ? 'removed from' : 'added to'} favorites.`
      );
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

  const handleDeletePost = (e) => {
    e.preventDefault();

    dispatch(deletePost(post.id))
      .then(() => {
        toast.success('Post deleted.');
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
      dispatch(createPostFlag(post.id, flagPost.reason))
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
    <PostSingleContainer className="container" id="post-single">
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
                  deletePost={handleDeletePost}
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
    </PostSingleContainer>
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

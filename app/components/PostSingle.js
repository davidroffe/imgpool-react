import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, setPostsList, setMenu, setTags } from '../actions';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import TagMenu from './TagMenu';
import FlagPost from './FlagPost';
import tagUtil from '../utils/tags';

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    isAdmin: state.user.admin,
    userFavorites: state.user.favorites,
    optionsMenu: state.menus.postOptions,
  };
};

const Single = (props) => {
  const [post, setPost] = useState({
    id: props.match.params.id || '',
    tag: [],
    user: {
      id: '',
      username: '',
    },
  });
  const [flagPost, setFlagPost] = useState({
    show: false,
    reason: '',
  });
  useEffect(() => {
    let isMounted = true;
    axios
      .get('/api/post/single', {
        params: { id: post.id },
      })
      .then((res) => {
        if (isMounted) {
          setPost(res.data);
          props.dispatch(setTags(tagUtil.getTagsFromPosts([res.data])));
        }
      })
      .catch(() => props.history.push('/404'));

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFavorite = (e) => {
    e.preventDefault();

    axios({
      url: '/api/post/favorite',
      method: 'post',
      params: {
        postId: post.id,
      },
    }).then((res) => {
      toast.success(
        `Post ${isFavorited() ? 'removed from' : 'added to'} favorites.`
      );
      props.dispatch(setUser('favorites', res.data.favorites));
    });
  };

  const toggleOptionsMenu = () => {
    props.dispatch(setMenu('POST_OPTIONS_MENU', !props.optionsMenu));
  };

  const isFavorited = () => {
    for (let i = 0; i < props.userFavorites.length; i++) {
      if (props.userFavorites[i].id === post.id) return true;
    }
    return false;
  };

  const deletePost = (e) => {
    e.preventDefault();

    axios({
      url: `/api/post/delete/${post.id}`,
      method: 'post',
    })
      .then(() => {
        toast.success('Post deleted.');
        props.dispatch(setPostsList([]));
        props.dispatch(setTags([]));
        props.history.push('/posts');
      })
      .catch((error) => {
        toast.error(error.response.data);
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
      axios({
        url: '/api/post/flag/create',
        method: 'post',
        params: {
          postId: post.id,
          reason: flagPost.reason,
        },
      })
        .then((res) => {
          if (res.data.status === 'success') {
            setFlagPost({
              show: false,
              reason: '',
            });
            toast.success('Post flagged.');
          }
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  };

  const clearFlagPost = () => {
    setFlagPost({ show: false, reason: '' });
  };

  return (
    <section className="container" id="post-single">
      <ToastContainer />
      <TagMenu />
      <div className="image-container">
        <div className="inner">
          <div className="post-info">
            <button className="toggle-options" onClick={toggleOptionsMenu}>
              options <span>+</span>
            </button>
            <ul className={`options${props.optionsMenu ? ' active' : ''}`}>
              <li>
                <button
                  className={`toggle-fav${isFavorited() ? ' favorited' : ''}`}
                  onClick={toggleFavorite}
                >
                  <span className="icon">&hearts;</span>
                  <span className="text add">add to favorites</span>
                  <span className="text remove">remove from favorites</span>
                </button>
              </li>
              {props.userId ? (
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
              ) : null}
              {post.userId === props.userId || props.isAdmin ? (
                <li>
                  <button className="delete-post" onClick={deletePost}>
                    <span className="icon x">×</span>
                    <span className="text">delete post</span>
                  </button>
                </li>
              ) : null}
            </ul>
            <p className="poster">
              posted by:{' '}
              <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
            </p>
          </div>
          <img src={post.url} />
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

Single.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userFavorites: PropTypes.array.isRequired,
  optionsMenu: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Single);

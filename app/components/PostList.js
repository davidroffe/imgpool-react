import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../actions';
import PropTypes from 'prop-types';
import TagMenu from './TagMenu';

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const List = (props) => {
  const [showLoadMore, setShowLoadMore] = useState(false);
  useEffect(() => {
    setShowLoadMore(props.posts.list.length % 18 !== 0 ? false : true);
    if (!props.posts.list.length) {
      retrievePosts();
    }
  });

  const retrievePosts = () => {
    axios
      .get('/api/post/list', { params: { offset: props.posts.offset } })
      .then((res) => {
        const newPostList = [...props.posts.list, ...res.data];
        props.dispatch(
          setPosts(
            res.data.length
              ? {
                  list: newPostList,
                  offset: props.posts.offset + res.data.length,
                }
              : { list: [false], offset: props.posts.offset + res.data.length }
          )
        );
      });
  };

  const loadMorePosts = (e) => {
    e.preventDefault();

    retrievePosts();
  };

  if (!props.posts.list[0]) {
    return (
      <section id="splash">
        <div id="splash-center">
          <h1>IMGPOOL</h1>
        </div>
      </section>
    );
  } else {
    return (
      <section id="post-list">
        <TagMenu />
        {props.posts.list.map((post, index) => {
          return (
            <Link key={index} to={'/post/' + post.id} className="post-item">
              <img
                src={post.thumbUrl}
                alt={post.tag.map((tag) => {
                  return tag.name;
                })}
              />
            </Link>
          );
        })}
        <div id="load-more-container">
          {showLoadMore ? (
            <button
              className="border-button"
              id="load-more"
              onClick={loadMorePosts}
            >
              Load More
            </button>
          ) : null}
        </div>
      </section>
    );
  }
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(List);

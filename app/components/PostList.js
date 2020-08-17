import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (!props.posts.list.length) {
      retrievePosts(1);
    }
  });

  const retrievePosts = (nextPage) => {
    axios.get('/api/post/list', { params: { page: nextPage } }).then((res) => {
      props.dispatch(
        setPosts(
          res.data.length
            ? {
                list: res.data,
                page: nextPage,
              }
            : { list: [false], page: nextPage }
        )
      );
    });
  };

  const changePage = (page, e) => {
    e.preventDefault();

    if (page === 'next') {
      page = props.posts.page + 1;
    } else if (page === 'prev') {
      page = props.posts.page - 1;
    }

    retrievePosts(page);
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
        <aside className="paginator">
          <button className="previous" onClick={changePage.bind(null, 'prev')}>
            ←
          </button>
          <button className="number" onClick={changePage.bind(null, 1)}>
            {props.posts.page}
          </button>
          <button className="next" onClick={changePage.bind(null, 'next')}>
            →
          </button>
        </aside>
      </section>
    );
  }
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(List);

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPosts } from '../actions';
import PropTypes from 'prop-types';
import TagMenu from './TagMenu';
import apiUtil from '../utils/api';

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    searchQuery: state.search,
  };
};

const List = (props) => {
  const [lastPage, setLastPage] = useState(
    Math.ceil(props.posts.totalCount / 18)
  );
  useEffect(() => {
    if (!props.posts.list.length) {
      retrievePosts(props.posts.page);
    }
    setLastPage(Math.ceil(props.posts.totalCount / 18));
  }, [props.posts]);

  const retrievePosts = (nextPage) => {
    apiUtil.search(props.searchQuery, nextPage).then((res) => {
      props.dispatch(
        setPosts(
          res.list.length
            ? {
                list: res.list,
                page: nextPage,
                totalCount: res.totalCount,
              }
            : { list: [false], page: 1, totalCount: 0 }
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
          <button
            className="previous"
            disabled={props.posts.page < 2}
            onClick={changePage.bind(null, 'prev')}
          >
            ←
          </button>
          {props.posts.page >= 6 ? (
            <button className="number" onClick={changePage.bind(null, 1)}>
              1
            </button>
          ) : null}

          {[...Array(5)].map((el, i) => {
            const pageLink = props.posts.page - (i + 1);

            if (pageLink > 0) {
              return (
                <button
                  key={i}
                  className="number"
                  onClick={changePage.bind(null, pageLink)}
                >
                  {pageLink}
                </button>
              );
            }
          })}
          <button
            className="number active"
            onClick={changePage.bind(null, props.posts.page)}
          >
            {props.posts.page}
          </button>
          {[...Array(5)].map((el, i) => {
            const pageLink = props.posts.page + (i + 1);

            if (pageLink <= lastPage) {
              return (
                <button
                  key={i}
                  className="number"
                  onClick={changePage.bind(null, pageLink)}
                >
                  {pageLink}
                </button>
              );
            }
          })}
          {props.posts.page <= lastPage - 6 ? (
            <button
              className="number"
              onClick={changePage.bind(null, lastPage)}
            >
              {lastPage}
            </button>
          ) : null}
          <button
            className="next"
            disabled={lastPage === props.posts.page}
            onClick={changePage.bind(null, 'next')}
          >
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, setTagsFromExistingPosts } from '../actions';
import PropTypes from 'prop-types';
import TagMenu from './TagMenu';
import Loader from './Utility/Loader';

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const PostList = (props) => {
  const [lastPage, setLastPage] = useState(
    Math.ceil(props.posts.totalCount / 18)
  );

  useEffect(() => {
    if (!props.posts.list.length) {
      props.dispatch(fetchPosts());
    }
    props.dispatch(setTagsFromExistingPosts());
    setLastPage(Math.ceil(props.posts.totalCount / 18));
  }, [props.posts]);

  const changePage = (page, e) => {
    e.preventDefault();

    if (page === 'next') {
      page = props.posts.page + 1;
    } else if (page === 'prev') {
      page = props.posts.page - 1;
    }
    props.dispatch(fetchPosts({ newPage: page }));
  };

  if (!props.posts.list[0] && !props.posts.loading) {
    return (
      <section id="splash">
        <div id="splash-center">
          <h1>IMGPOOL</h1>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <TagMenu />
        {props.posts.loading ? (
          <section id="post-list">
            <Loader show={props.posts.loading} />
          </section>
        ) : (
          <section id="post-list">
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
          </section>
        )}

        <aside className="paginator">
          <button
            className="previous"
            disabled={props.posts.page < 2 || props.posts.loading}
            onClick={changePage.bind(null, 'prev')}
          >
            ←
          </button>
          {props.posts.page >= 6 ? (
            <button
              disabled={props.posts.loading}
              className="number"
              onClick={changePage.bind(null, 1)}
            >
              1
            </button>
          ) : null}

          {[...Array(5)].map((el, i) => {
            const pageLink = props.posts.page - (i + 1);

            if (pageLink > 0) {
              return (
                <button
                  key={i}
                  disabled={props.posts.loading}
                  className="number"
                  onClick={changePage.bind(null, pageLink)}
                >
                  {pageLink}
                </button>
              );
            }
          })}
          <button
            disabled={props.posts.loading}
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
                  disabled={props.posts.loading}
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
              disabled={props.posts.loading}
              className="number"
              onClick={changePage.bind(null, lastPage)}
            >
              {lastPage}
            </button>
          ) : null}
          <button
            className="next"
            disabled={lastPage === props.posts.page || props.posts.loading}
            onClick={changePage.bind(null, 'next')}
          >
            →
          </button>
        </aside>
      </div>
    );
  }
};

PostList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PostList);

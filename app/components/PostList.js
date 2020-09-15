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
    loading: state.loading,
  };
};

const PostList = (props) => {
  const [lastPage, setLastPage] = useState(
    Math.ceil(props.posts.totalCount / 18)
  );
  const [isLoading, setIsLoading] = useState(false);
  let imagesLoading = 0;
  let imagesLoaded = 0;

  useEffect(() => {
    if (!props.posts.list.length) {
      retrievePosts();
    }
    props.dispatch(setTagsFromExistingPosts());
    setLastPage(Math.ceil(props.posts.totalCount / 18));
  }, [props.posts]);

  const retrievePosts = () => {
    setIsLoading(true);
    imagesLoading = 0;
    imagesLoaded = 0;

    props.dispatch(fetchPosts());
  };

  const changePage = (page, e) => {
    e.preventDefault();

    if (page === 'next') {
      page = props.posts.page + 1;
    } else if (page === 'prev') {
      page = props.posts.page - 1;
    }
    setIsLoading(true);
    props.dispatch(fetchPosts({ newPage: page }));
  };

  if (!props.posts.list[0] && props.posts.init) {
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
        <section id="post-list">
          <Loader show={isLoading} />
          {props.posts.list.map((post, index) => {
            imagesLoading++;
            return (
              <Link key={index} to={'/post/' + post.id} className="post-item">
                <img
                  onLoad={() => {
                    if (imagesLoaded + 1 === imagesLoading) setIsLoading(false);
                    imagesLoaded++;
                  }}
                  src={post.thumbUrl}
                  alt={post.tag.map((tag) => {
                    return tag.name;
                  })}
                />
              </Link>
            );
          })}
        </section>
        <aside className="paginator">
          <button
            className="previous"
            disabled={props.posts.page < 2 || isLoading}
            onClick={changePage.bind(null, 'prev')}
          >
            ←
          </button>
          {props.posts.page >= 6 ? (
            <button
              disabled={isLoading}
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
                  className="number"
                  onClick={changePage.bind(null, pageLink)}
                >
                  {pageLink}
                </button>
              );
            }
          })}
          <button
            disabled={isLoading}
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
                  disabled={isLoading}
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
              disabled={isLoading}
              className="number"
              onClick={changePage.bind(null, lastPage)}
            >
              {lastPage}
            </button>
          ) : null}
          <button
            className="next"
            disabled={lastPage === props.posts.page || isLoading}
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

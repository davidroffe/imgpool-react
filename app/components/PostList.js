import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, setTagsFromExistingPosts } from '../actions';
import PropTypes from 'prop-types';
import TagMenu from './TagMenu';
import Paginator from './Paginator';
import PostListItem from './PostListItem';
import Loader from './Utility/Loader';

const postsPerPage = process.env.POSTS_PER_PAGE;
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export const PostList = (props) => {
  const [lastPage, setLastPage] = useState(
    Math.ceil(props.posts.totalCount / postsPerPage)
  );

  useEffect(() => {
    if (!props.posts.list.length && !props.posts.loading) {
      props.dispatch(fetchPosts());
    }
    props.dispatch(setTagsFromExistingPosts());
    setLastPage(Math.ceil(props.posts.totalCount / postsPerPage));
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
            {props.posts.list.map((post) => {
              return (
                <PostListItem
                  key={post.id}
                  id={post.id}
                  thumbUrl={post.thumbUrl}
                  tags={post.tag}
                />
              );
            })}
          </section>
        )}
        <Paginator
          changePage={changePage}
          page={props.posts.page}
          lastPage={lastPage}
          loading={props.posts.loading}
        />
      </div>
    );
  }
};

PostList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PostList);

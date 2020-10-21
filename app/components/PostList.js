import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPosts, setTagsFromExistingPosts } from '../actions';
import PropTypes from 'prop-types';
import TagMenu from './TagMenu';
import Paginator from './Paginator';
import PostListItem from './PostListItem';
import Loader from './Utility/Loader';
import Splash from './Splash';

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export const PostList = ({ posts, dispatch }) => {
  const postsPerPage = process.env.POSTS_PER_PAGE;
  const [lastPage, setLastPage] = useState(
    Math.ceil(posts.totalCount / postsPerPage)
  );

  useEffect(() => {
    if (!posts.list.length && !posts.loading) {
      dispatch(getPosts());
    }
    dispatch(setTagsFromExistingPosts());
    setLastPage(Math.ceil(posts.totalCount / postsPerPage));
  }, [posts]);

  const changePage = (page, e) => {
    e.preventDefault();

    if (page === 'next') {
      page = posts.page + 1;
    } else if (page === 'prev') {
      page = posts.page - 1;
    }
    dispatch(getPosts({ newPage: page }));
  };

  if (!posts.list[0] && !posts.loading) {
    return <Splash />;
  } else {
    return (
      <div>
        <TagMenu />
        {posts.loading ? (
          <section id="post-list">
            <Loader show={posts.loading} />
          </section>
        ) : (
          <section id="post-list">
            {posts.list.map((post) => {
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
          page={posts.page}
          lastPage={lastPage}
          loading={posts.loading}
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

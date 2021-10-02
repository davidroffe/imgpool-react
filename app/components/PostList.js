import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPosts, setTagsFromExistingPosts } from '../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagMenu from './TagMenu';
import Paginator from './Paginator';
import PostListItem from './PostListItem';
import Loader from './Utility/Loader';
import Splash from './Splash';

const PostListContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 40px 45px;
  @media (max-width: 720px) {
    justify-content: flex-start;
    margin: 15px 45px;
  }

  .post-item {
    margin: 10px;
    overflow: hidden;
    box-sizing: border-box;
    @media (max-width: 720px) {
      width: 50%;
      margin: 0;
    }

    img {
      display: block;
      transition: transform 0.5s;
      @media (max-width: 720px) {
        width: 100%;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
  #load-more-container {
    flex-basis: 100%;
    margin-top: 25px;

    #load-more {
      margin: 0 auto;
    }
  }
`;

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
          <PostListContainer>
            <Loader show={posts.loading} />
          </PostListContainer>
        ) : (
          <PostListContainer>
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
          </PostListContainer>
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

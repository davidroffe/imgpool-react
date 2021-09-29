import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPosts, setMenu, closeAllMenusExcept } from '../actions';
import TagMenuItem from './TagMenuItem';
import BurgerButton from './Utility/BurgerButton';

const TagMenuContainer = styled.aside`
  position: fixed;
  left: -225px;
  top: 0;
  height: 100%;
  display: flex;
  background-color: #333;
  transition: left 0.5s;
  z-index: 1;

  &.active {
    left: 0;
  }

  .body {
    width: 225px;

    nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20%;

      .tag {
        color: #fffef2;
        font-size: 1.4rem;
        line-height: 1.8rem;
        &:hover {
          color: #757575;
        }
        @media (max-width: 720px) {
          margin-bottom: 10px;
        }

        &[active] {
          font-weight: 600;
          text-transform: uppercase;
        }
      }
    }
  }
  .tab {
    position: relative;
    width: 35px;
    border: none;
    background: inherit;
    outline: none;
    cursor: pointer;

    .burger {
      position: absolute;
      top: 10px;
      right: 50%;
      transform: translateX(50%);

      .line {
        display: inline-block;
        width: 2px;
        height: 24px;
        margin-right: 2px;
        background-color: #fffef2;

        &:first-child,
        &:last-child {
          height: 20px;
        }
      }
    }
    .text {
      display: inline-block;
      position: relative;
      left: -15px;
      transform: rotate(90deg);
      color: #fffef2;
      white-space: nowrap;

      @media (max-width: 720px) {
        left: -21px;
        font-size: 1.4rem;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    showMenu: state.menus.tags,
    tags: state.tags,
    posts: state.posts.list,
    searchQuery: state.search.split(' '),
  };
};

export const TagMenu = (props) => {
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    props.dispatch(setMenu('TAGS_MENU', !props.showMenu));
  };
  const handleMenuClick = (e) => {
    e.stopPropagation();
    props.dispatch(closeAllMenusExcept('TAGS_MENU'));
  };
  const handleTagClick = (tag, e) => {
    e.preventDefault();

    const tagName = e.target.innerText.toLowerCase();
    const tagIndex = props.searchQuery.indexOf(tagName);
    let newSearchQuery =
      props.searchQuery.length === 1 && props.searchQuery[0] === ''
        ? []
        : [...props.searchQuery];

    if (tagIndex > -1) {
      newSearchQuery.splice(tagIndex, 1);

      if (newSearchQuery.length === 0) newSearchQuery.push('');
    } else {
      newSearchQuery.push(tagName);
    }

    newSearchQuery =
      newSearchQuery.length > 1 ? newSearchQuery.join(' ') : newSearchQuery[0];

    props.dispatch(getPosts({ newSearchQuery })).then(() => {
      props.history.push('/posts');
    });
  };

  return (
    <TagMenuContainer id="tag-menu" className={props.showMenu ? 'active' : ''}>
      <div className="body" onClick={handleMenuClick}>
        <nav>
          {props.tags.map((tag, index) => (
            <TagMenuItem
              key={index}
              tag={tag}
              handleTagClick={handleTagClick}
            />
          ))}
        </nav>
      </div>
      <BurgerButton onClick={toggleMenu} />
    </TagMenuContainer>
  );
};

TagMenu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  searchQuery: PropTypes.array.isRequired,
};

export default withRouter(connect(mapStateToProps)(TagMenu));

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, setMenu, closeAllMenusExcept } from '../actions';

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
    <aside id="tag-menu" className={props.showMenu ? 'active' : ''}>
      <div className="body" onClick={handleMenuClick}>
        <nav>
          {props.tags.map((tag, index) => {
            return (
              <Link
                key={index}
                to={'post?tag=' + tag.id}
                className={'tag ' + tag.active}
                onClick={handleTagClick.bind(this, tag)}
                active={tag.active ? '' : null}
              >
                {tag.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <button className="tab" onClick={toggleMenu}>
        <span className="burger">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </span>
        <span className="text">View Tags</span>
      </button>
    </aside>
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

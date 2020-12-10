import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TagMenuItem = ({ tag, handleTagClick }) => (
  <Link
    to={'post?tag=' + tag.id}
    className={'tag ' + tag.active}
    onClick={handleTagClick.bind(this, tag)}
    active={tag.active ? '' : null}
  >
    {tag.name}
  </Link>
);

TagMenuItem.propTypes = {
  tag: PropTypes.object.isRequired,
  handleTagClick: PropTypes.func.isRequired,
};

export default TagMenuItem;

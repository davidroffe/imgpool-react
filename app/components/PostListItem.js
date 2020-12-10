import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostListItem = ({ id, thumbUrl, tags }) => {
  return (
    <Link to={'/post/' + id} className="post-item">
      <img
        src={thumbUrl}
        alt={tags.map((tag) => {
          return tag.name;
        })}
      />
    </Link>
  );
};

PostListItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default PostListItem;

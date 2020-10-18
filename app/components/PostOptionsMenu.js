import React from 'react';
import PropTypes from 'prop-types';

const PostOptionsMenu = ({
  toggleMenu,
  optionsMenu,
  handleMenuClick,
  isFavorited,
  toggleFavorite,
  setFlagPost,
  flagPost,
  deletePost,
  isUploader,
  isAdmin,
}) => {
  return (
    <div>
      <button className="toggle-options" onClick={toggleMenu}>
        options <span>+</span>
      </button>
      <ul
        className={`options${optionsMenu ? ' active' : ''}`}
        onClick={handleMenuClick}
      >
        <li>
          <button
            className={`toggle-fav${isFavorited ? ' favorited' : ''}`}
            onClick={toggleFavorite}
          >
            <span className="icon">&hearts;</span>
            <span className="text add">add to favorites</span>
            <span className="text remove">remove from favorites</span>
          </button>
        </li>
        <li>
          <button
            className="flag-post"
            onClick={() => {
              setFlagPost({ ...flagPost, show: true });
            }}
          >
            <span className="icon flag">&#9873;</span>
            <span className="text">flag post</span>
          </button>
        </li>
        {isUploader || isAdmin ? (
          <li>
            <button className="delete-post" onClick={deletePost}>
              <span className="icon x">×</span>
              <span className="text">delete post</span>
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

PostOptionsMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  optionsMenu: PropTypes.bool.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  setFlagPost: PropTypes.func.isRequired,
  flagPost: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  isUploader: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default PostOptionsMenu;

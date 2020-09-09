import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => {
  return props.show ? (
    <div className="loader-container">
      <div className="preloader2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  ) : null;
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Loader;

import React from 'react';
import PropTypes from 'prop-types';

const BurgerButton = ({ onClick }) => (
  <button className="tab" onClick={onClick}>
    <span className="burger">
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </span>
    <span className="text">View Tags</span>
  </button>
);

BurgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerButton;

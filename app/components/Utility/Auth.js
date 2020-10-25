import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../actions';
import AuthContext from '../../context/auth';

const Auth = ({ children, location, dispatch }) => {
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [location]);

  const isAuthorized = () => {
    dispatch(getCurrentUser());
  };

  return (
    <AuthContext.Provider value={{ isAuthorized }}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(
  connect(() => {
    return {};
  })(Auth)
);

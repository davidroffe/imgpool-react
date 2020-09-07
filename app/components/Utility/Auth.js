import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser, clearUser } from '../../actions';
import AuthContext from '../../context/auth';

const Auth = (props) => {
  useEffect(() => {
    fetch('/api/user/get/current', { method: 'POST' })
      .then((res) => res.json())
      .then((res) => {
        if (res.valid) {
          props.dispatch(setUser('id', res.id));
          props.dispatch(setUser('username', res.username));
          props.dispatch(setUser('email', res.email));
          props.dispatch(setUser('bio', res.bio));
          props.dispatch(setUser('loggedIn', true));
          props.dispatch(setUser('admin', res.admin));
          props.dispatch(setUser('favorites', res.favorites));
          props.dispatch(setUser('init', true));
        } else {
          props.dispatch(clearUser());
        }
      });
  }, [props.location]);

  const isAuthorized = () => {
    fetch('/api/user/get/current', { method: 'POST' })
      .then((res) => res.json())
      .then((res) => {
        if (res.valid) {
          props.dispatch(setUser('id', res.id));
          props.dispatch(setUser('username', res.username));
          props.dispatch(setUser('email', res.email));
          props.dispatch(setUser('bio', res.bio));
          props.dispatch(setUser('loggedIn', true));
          props.dispatch(setUser('admin', res.admin));
          props.dispatch(setUser('favorites', res.favorites));
          props.dispatch(setUser('init', true));
        } else {
          props.dispatch(setUser('init', true));
        }
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthorized }}>
      <div>{props.children}</div>
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

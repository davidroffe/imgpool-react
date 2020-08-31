import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

const PasswordReset = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();

    let newErrorMessage = [];
    const url = '/api/user/password-reset';

    if (password !== passwordConfirm) {
      newErrorMessage.push('Passwords do not match.');
    }
    if (password.length < 8) {
      newErrorMessage.push('Password must be at least 8 characters.');
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        toast.error(error);
      });
    } else {
      const urlSearchParams = new URLSearchParams({
        passwordResetToken: props.match.params.passwordResetToken,
        password: password,
      });
      fetch(`${url}?${urlSearchParams}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          props.dispatch(setUser('email', res.email));
          props.dispatch(setUser('username', res.username));
          props.dispatch(setUser('loggedIn', true));
          props.history.push('/account');
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div id="account-center">
      <ToastContainer />
      <div id="center-box">
        <form className="form-dark" onSubmit={handlePasswordResetSubmit}>
          <div className="field-container">
            <input
              id="password"
              autoComplete={'off'}
              type={'password'}
              title={'Password'}
              name={'password'}
              value={password}
              placeholder={'PASSWORD'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="passwordConfirm"
              autoComplete={'off'}
              type={'password'}
              title={'password-confirm'}
              name={'password-confirm'}
              value={passwordConfirm}
              placeholder={'CONFIRM PASSWORD'}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input
            className="border-button"
            type="submit"
            value="RESET PASSWORD"
          />
        </form>
      </div>
    </div>
  );
};

PasswordReset.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(() => {
  return {};
})(PasswordReset);

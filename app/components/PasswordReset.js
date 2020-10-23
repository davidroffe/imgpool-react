import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

export const PasswordReset = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();

    props
      .dispatch(
        resetPassword(
          null,
          password,
          passwordConfirm,
          props.match.params.passwordResetToken
        )
      )
      .then(() => {
        props.history.push('/account');
      })
      .catch((error) => {
        if (Array.isArray(error)) {
          error.forEach((errorItem) => {
            toast.error(errorItem);
          });
        } else {
          toast.error(error);
        }
      });
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

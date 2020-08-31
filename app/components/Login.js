import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../actions';
import { ToastContainer, toast } from 'react-toastify';

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    username: state.user.username,
    password: state.user.password,
    passwordConfirm: state.user.passwordConfirm,
    userInit: state.user.init,
    isLoggedIn: state.user.loggedIn,
  };
};

export const Login = (props) => {
  const [form, setForm] = useState('login');
  const [canSignUp, setCanSignUp] = useState(true);

  useEffect(() => {
    fetch('/api/setting/signup', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setCanSignUp(res.signUp);
        }
      });
  }, []);

  useEffect(() => {
    if (props.userInit && props.isLoggedIn) {
      props.history.push('/account');
    }
  });

  useEffect(() => {
    if (form === 'signUp') {
      window.grecaptcha.render('recaptcha', {
        sitekey: process.env.RECAPTCHA_KEY,
        theme: 'dark',
      });
    }
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let recaptchaResponse = '';
    let newErrorMessage = [];
    let url;

    const { email, username, password, passwordConfirm } = props;

    switch (form) {
      case 'login':
        url = '/api/user/login';
        break;
      case 'signUp':
        url = '/api/user/signup';
        recaptchaResponse = window.grecaptcha.getResponse();
        break;
      case 'forgotPassword':
        url = '/api/user/password-reset';
        break;
    }

    if (email === undefined || email === '') {
      newErrorMessage.push('Please enter an email.');
    }
    if (form === 'login' || form === 'signUp') {
      if (password === undefined || password === '') {
        newErrorMessage.push('Please enter a password.');
      }
    }
    if (form === 'signUp') {
      if (password !== passwordConfirm) {
        newErrorMessage.push('Passwords do not match.');
      }
      if (password.length < 8) {
        newErrorMessage.push('Password must be at least 8 characters.');
      }
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        toast.error(error);
      });
    } else {
      const urlSeachParams = new URLSearchParams({
        email: email,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
        recaptchaResponse,
      });
      fetch(`${url}?${urlSeachParams}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          if (form === 'forgotPassword') {
            toast.success('An email has been sent.');
          } else {
            props.dispatch(setUser('email', res.email));
            props.dispatch(setUser('username', res.username));
            props.dispatch(setUser('loggedIn', true));
            props.dispatch(setUser('admin', res.admin));
            props.history.push('/account');
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;

    props.dispatch(setUser(field, value));
  };

  const switchForm = (e) => {
    e.preventDefault();

    if (e.target.id === 'forgot-password') {
      setForm('forgotPassword');
    } else {
      setForm(form === 'login' ? 'signUp' : 'login');
    }
  };

  return (
    <div id="account-center">
      <ToastContainer />
      <div id="center-box">
        <form className="form-dark" onSubmit={handleSubmit}>
          <div className="field-container">
            <input
              id="email"
              autoComplete={'off'}
              type={'text'}
              title={'Full Name'}
              name={'email'}
              value={props.email}
              placeholder={'EMAIL'}
              onChange={handleChange}
            />
            {form === 'signUp' ? (
              <input
                id="username"
                autoComplete={'off'}
                type={'text'}
                title={'Username'}
                name={'username'}
                value={props.username}
                placeholder={'USERNAME'}
                onChange={handleChange}
              />
            ) : null}
            {form === 'signUp' || form === 'login' ? (
              <input
                id="password"
                autoComplete={'off'}
                type={'password'}
                title={'Password'}
                name={'password'}
                value={props.password}
                placeholder={'PASSWORD'}
                onChange={handleChange}
              />
            ) : null}
            {form === 'signUp' ? (
              <input
                id="passwordConfirm"
                autoComplete={'off'}
                type={'password'}
                title={'password-confirm'}
                name={'password-confirm'}
                value={props.passwordConfirm}
                placeholder={'CONFIRM PASSWORD'}
                onChange={handleChange}
              />
            ) : null}
          </div>
          {form === 'signUp' ? <div id="recaptcha"></div> : null}
          <input
            className="border-button"
            type="submit"
            value={(() => {
              switch (form) {
                case 'login':
                  return 'LOGIN';
                case 'signUp':
                  return 'SIGN UP';
                case 'forgotPassword':
                  return 'SEND EMAIL';
              }
            })()}
          />
          <p>
            {canSignUp ? (
              <span>
                <button className="switch-form" onClick={switchForm}>
                  {form === 'login' ? 'Sign Up' : 'Login'}
                </button>
                <span> | </span>
              </span>
            ) : null}
            <button
              id="forgot-password"
              className="switch-form"
              onClick={switchForm}
            >
              Forgot Password
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  userInit: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Login);

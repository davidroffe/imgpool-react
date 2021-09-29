import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { login, signUp, forgotPassword } from '../actions';
import settingsApi from '../api/setting';
import { ToastContainer, toast } from 'react-toastify';
import BorderButton from './Utility/BorderButton';
import Input from './Utility/Input';

const StyledContainer = styled.div`
  width: 540px;
  margin: 200px auto 0;
  @media (max-width: 720px) {
    width: 100%;
    margin-top: 100px;
  }

  #center-box {
    width: 520px;
    margin: 50px auto 0;
    background: rgba(0, 0, 0, 0.6);
    padding: 25px 0;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04),
      -6px 8px 15px rgba(0, 0, 0, 0.04), 6px 8px 15px rgba(0, 0, 0, 0.04);
    @media (max-width: 720px) {
      width: 100%;
    }
    > form {
      width: 400px;
      margin: 0 auto;
      @media (max-width: 720px) {
        width: 100%;
      }
    }

    button.switch-form {
      background: none;
      border: none;
      color: inherit;
      float: none;
      padding: 0;
      width: auto;
      font-weight: inherit;
      font-family: inherit;
      font-size: inherit;
      margin: 0;
      outline: none;
      cursor: pointer;
    }

    button.switch-form:hover {
      text-decoration: underline;
    }

    form p {
      color: #fff;
      margin-top: 25px;
      text-align: center;
    }

    > form p a {
      color: #e96333;
    }

    > form p a:hover {
      text-decoration: underline;
    }
  }
`;

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

export const Login = ({ userInit, isLoggedIn, history, dispatch }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [form, setForm] = useState('login');
  const [canSignUp, setCanSignUp] = useState(true);

  useEffect(() => {
    settingsApi.signup().then((res) => {
      if (res) {
        setCanSignUp(res.signUp);
      }
    });
  }, []);

  useEffect(() => {
    if (userInit && isLoggedIn) {
      history.push('/account');
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

    let processing;

    switch (form) {
      case 'login':
        processing = dispatch(login(email, password)).then(() => {
          history.push('/account');
        });
        break;
      case 'signUp':
        processing = dispatch(
          signUp(email, username, password, passwordConfirm)
        ).then(() => {
          history.push('/account');
        });
        break;
      case 'forgotPassword':
        processing = dispatch(forgotPassword(email)).then((message) => {
          toast.success(message);
        });
        break;
    }

    processing.catch((error) => {
      if (Array.isArray(error)) {
        error.forEach((errorItem) => {
          toast.error(errorItem);
        });
      } else {
        toast.error(error);
      }
    });
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
    <StyledContainer>
      <ToastContainer />
      <div id="center-box">
        <form className="form-dark" onSubmit={handleSubmit}>
          <div className="field-container">
            <Input
              id="email"
              autoComplete={'off'}
              type={'text'}
              title={'Full Name'}
              name={'email'}
              value={email}
              placeholder={'EMAIL'}
              onChange={(e) => setEmail(e.target.value)}
            />
            {form === 'signUp' ? (
              <Input
                id="username"
                autoComplete={'off'}
                type={'text'}
                title={'Username'}
                name={'username'}
                value={username}
                placeholder={'USERNAME'}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : null}
            {form === 'signUp' || form === 'login' ? (
              <Input
                id="password"
                autoComplete={'off'}
                type={'password'}
                title={'Password'}
                name={'password'}
                value={password}
                placeholder={'PASSWORD'}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : null}
            {form === 'signUp' ? (
              <Input
                id="passwordConfirm"
                autoComplete={'off'}
                type={'password'}
                title={'password-confirm'}
                name={'password-confirm'}
                value={passwordConfirm}
                placeholder={'CONFIRM PASSWORD'}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            ) : null}
          </div>
          {form === 'signUp' ? <div id="recaptcha"></div> : null}
          <BorderButton type="submit" value=
          {(() => {
              switch (form) {
                case 'login':
                  return 'LOGIN';
                case 'signUp':
                  return 'SIGN UP';
                case 'forgotPassword':
                  return 'SEND EMAIL';
              }
            })()} as="input" />
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
      </StyledContainer>
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

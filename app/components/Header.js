import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../assets/images/logo.svg';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 50px;
  @media (max-width: 720px) {
    padding: 15px 45px 0;
  }

  .left {
    display: flex;
    @media (max-width: 720px) {
      width: 100%;
    }
    .logo {
      display: inline-block;
      max-width: 150px;
      margin-top: 15px;
      @media (max-width: 720px) {
        margin: 0;
      }

      img {
        width: 100%;
      }
    }
    #main-nav {
      display: flex;
      align-items: flex-end;
      margin: 0 10px;

      a {
        margin: 0 8px 3px;
        padding-bottom: 1px;
        font-size: 1.2rem;
        font-family: sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        color: #333;
        border-bottom: 3px solid transparent;

        &:hover {
          border-bottom-color: #333;
        }
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    admin: state.user.admin,
  };
};

const Header = (props) => {
  return (
    <StyledHeader id="main-header">
      <div className="left">
        <Link className="logo" to="/">
          <img src={Logo} alt="Imgpool Logo" />
        </Link>
        <nav id="main-nav">
          <Link to="/posts">Posts</Link>
          <Link to="/account">Account</Link>
          <Link to="/about">About</Link>
          {props.loggedIn && props.admin ? (
            <Link to="/admin">Admin</Link>
          ) : null}
        </nav>
      </div>
      {props.children}
    </StyledHeader>
  );
};

Header.propTypes = {
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Header);

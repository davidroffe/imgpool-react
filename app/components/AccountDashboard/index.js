import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editUser, createNewPost } from '../../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import BorderButton from "../Utility/BorderButton";
import CreatePost from './CreatePost';
import EditAccount from './EditAccount';
import Loader from '../Utility/Loader';
import userApi from '../../api/users';

const AccountContainer = styled.section`
  @media (max-width: 900px) {
    max-width: none;
  }

  .inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 720px) {
      flex-direction: column;
    }
  }

  h1 {
    width: 100%;
    @media (max-width: 720px) {
      order: 1;
      margin: 0 0 35px;
      font-size: 5rem;
    }
  }
  .left {
    max-width: 50%;

    @media (max-width: 720px) {
      order: 3;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 30px;

      h2 {
        flex-basis: 100%;
      }
      p {
        margin: 10px 10px 10px 0;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 2rem;

        span {
          padding: 2px 0;
          background-color: rgba(0, 0, 0, 0.6);
          line-height: 2rem;
        }
      }
      button {
        border: none;
        background: none;
        outline: none;
        height: 2rem;
        cursor: pointer;
        padding: 0;
      }
    }
    .button-large {
      margin: 0;
      font-size: 2.4rem;
      background: none;
      border: none;
      padding: 0;
      font-weight: 700;
      cursor: pointer;
    }
  }
  .right {
    @media (max-width: 720px) {
      order: 2;
      margin-bottom: 35px;
    }

    button {
      margin-bottom: 10px;
      @media (max-width: 720px) {
        width: 100%;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    username: state.user.username,
    bio: state.user.bio,
    loggedIn: state.user.loggedIn,
    userInit: state.user.init,
  };
};

const Dashboard = ({
  dispatch,
  history,
  email,
  username,
  bio,
  loggedIn,
  userInit,
}) => {
  const [editAccount, setEditAccount] = useState({
    show: false,
    field: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    bio: '',
  });
  const [createPost, setCreatePost] = useState({
    show: false,
    file: { value: {}, name: '' },
    source: '',
    tags: '',
  });
  useEffect(() => {
    if (userInit) {
      if (!loggedIn) {
        history.push('/login');
      } else {
        clearValues();
      }
    }
  }, [userInit]);
  useEffect(() => {
    clearValues();
  }, [email, username, bio]);
  const logout = (e) => {
    e.preventDefault();

    userApi.logout().then(() => {
      window.location.reload();
    });
  };
  const clearValues = () => {
    setEditAccount({
      show: false,
      field: '',
      email,
      username,
      bio,
      password: '',
      passwordConfirm: '',
    });
    setCreatePost({
      show: false,
      file: { value: {}, name: '' },
      source: '',
      tags: '',
    });
  };
  const handleChange = (form, field, e) => {
    let newObject;

    switch (form) {
      case 'editAccount':
        newObject = { ...editAccount };
        newObject[field] = e.target.value;
        setEditAccount(newObject);
        break;
      case 'createPost':
        newObject = { ...createPost };
        if (field === 'file') {
          newObject[field].name = e.target.value;
          newObject[field].value = e.target.files[0];
        } else {
          newObject[field] = e.target.value;
        }
        setCreatePost(newObject);
        break;
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(editUser(null, editAccount, email, username))
      .then((res) => {
        if (res.status === 'success') {
          clearValues();
          toast.success('Edit successful.');
        }
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

  const handleCreatePostSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewPost(createPost))
      .then((res) => {
        if (res.status === 'success') {
          clearValues();
          toast.success('Post creation successful.');
        }
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
    <AccountContainer className="container">
      <ToastContainer />
      {userInit && loggedIn ? (
        <div className="inner">
          <h1>
            <span>Account</span>
          </h1>
          <div className="left">
            <h2>Username</h2>
            <div className="row">
              <p>{username}</p>
              <button
                id="edit-username"
                onClick={() =>
                  setEditAccount({
                    ...editAccount,
                    show: true,
                    field: 'edit-username',
                  })
                }
              >
                edit
              </button>
            </div>
            <h2>Email</h2>
            <div className="row">
              <p>{email}</p>
              <button
                id="edit-email"
                onClick={() =>
                  setEditAccount({
                    ...editAccount,
                    show: true,
                    field: 'edit-email',
                  })
                }
              >
                edit
              </button>
            </div>
            <h2>Password</h2>
            <div className="row">
              <p>hidden</p>
              <button
                id="edit-password"
                onClick={() =>
                  setEditAccount({
                    ...editAccount,
                    show: true,
                    field: 'edit-password',
                  })
                }
              >
                edit
              </button>
            </div>
            <h2>Bio</h2>
            <div className="row">
              {bio ? <p>{bio}</p> : null}
              <button
                id="edit-bio"
                onClick={() =>
                  setEditAccount({
                    ...editAccount,
                    show: true,
                    field: 'edit-bio',
                  })
                }
              >
                edit
              </button>
            </div>
          </div>
          <div className="right">
            <BorderButton
              onClick={() =>
                setCreatePost({
                  ...createPost,
                  show: true,
                })
              }
            >
              Create Post
            </BorderButton>
            <BorderButton onClick={logout}>
              Log Out
            </BorderButton>
          </div>
          <EditAccount
            handleSubmit={handleEditSubmit}
            handleChange={handleChange}
            clearValues={clearValues}
            setData={setEditAccount}
            data={editAccount}
          />
          <CreatePost
            handleSubmit={handleCreatePostSubmit}
            handleChange={handleChange}
            clearValues={clearValues}
            setData={setCreatePost}
            data={createPost}
          />
        </div>
      ) : null}
      <Loader show={!userInit && !loggedIn} />
    </AccountContainer>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userInit: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Dashboard);

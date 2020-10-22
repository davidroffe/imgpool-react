import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, editUser } from '../../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import EditAccount from './EditAccount';
import Loader from '../Utility/Loader';
import userApi from '../../api/users';
import validate from '../../utils/validate';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    admin: state.user.admin,
    userInit: state.user.init,
  };
};

export const UserProfile = (props) => {
  const [editAccount, setEditAccount] = useState({
    show: false,
    field: '',
    email: '',
    username: '',
    bio: '',
  });
  const [user, setUser] = useState({
    username: '',
    email: '',
    joinDate: '',
    favorites: '',
    post: '',
    bio: '',
  });
  useEffect(() => {
    userApi
      .getUser(props.match.params.id)
      .then((res) => {
        if (res.valid) {
          setUser({
            ...res,
            favorites: res.favoritedPosts,
            joinDate: new Date(res.joinDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          });
        }
      })
      .catch(() => props.history.push('/404'));
  }, []);
  useEffect(() => {
    clearValues();
  }, [user]);
  const clearValues = () => {
    setEditAccount({
      show: false,
      field: '',
      email: user.email,
      username: user.username,
      bio: user.bio,
      password: '',
      passwordConfirm: '',
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
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const newErrorMessage = validate.editForm(
      editAccount,
      user.email,
      user.username
    );

    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        toast.error(error);
      });
    } else {
      props
        .dispatch(editUser(user.id, editAccount, user.email))
        .then((res) => {
          setUser((user) => {
            if (res.status === 'success') {
              toast.success('Edit successful.');
              return {
                ...user,
                email: res.email,
                username: res.username,
                bio: res.bio,
              };
            }
          });
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const resetPassword = () => {
    const url = `/api/user/password-reset/${user.id}`;

    fetch(url, {
      method: 'POST',
    }).then(() => {});
  };

  const handleToggleAccountSubmit = (e) => {
    e.preventDefault();

    userApi
      .toggleAccountStatus(user)
      .then((res) => {
        setUser({
          ...user,
          active: res.active,
        });

        toast.success(`Account ${res.active ? 'enabled' : 'disabled'}.`);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const handleFavoritesClick = (e) => {
    e.preventDefault();

    const newSearchQuery = `fp:${user.id}`;
    props.history.push('/posts');
    props.dispatch(getPosts({ newSearchQuery }));
  };

  const handlePostsClick = (e) => {
    e.preventDefault();

    const newSearchQuery = `user:${user.id}`;
    props.history.push('/posts');
    props.dispatch(getPosts({ newSearchQuery }));
  };

  return (
    <section className="container dashboard" id="account-dashboard">
      <ToastContainer />
      {props.userInit ? (
        <div className="inner">
          <h1>
            <span>User</span>
          </h1>
          <div className="left">
            <div className="row">
              <h2>Join Date</h2>
              <p>{user.joinDate}</p>
            </div>
            <div className="row">
              <h2>Username</h2>
              <p>{user.username}</p>
              {props.admin ? (
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
              ) : null}
            </div>
            {props.admin ? (
              <div className="row">
                <h2>Email</h2>
                <p>{user.email}</p>
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
            ) : null}
            {props.admin ? (
              <div className="row">
                <h2>Password</h2>
                <p>hidden</p>
                <button id="edit-password" onClick={resetPassword}>
                  reset
                </button>
              </div>
            ) : null}
            <div className="row favorites">
              <h2>Favorites</h2>
              <p>
                {user.favorites.length}{' '}
                {`favorite${user.favorites.length > 0 ? 's' : ''}`}
              </p>
              <button onClick={handleFavoritesClick}>view</button>
            </div>
            <div className="row posts">
              <h2>Posts</h2>
              <p>
                {user.post.length} {`post${user.post.length > 0 ? 's' : ''}`}
              </p>
              <button onClick={handlePostsClick}>view</button>
            </div>
            <div className="row">
              <h2>Bio</h2>
              {user.bio ? <p>{user.bio}</p> : null}
              {props.admin ? (
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
              ) : null}
            </div>
          </div>
          {props.admin ? (
            <div className="right">
              <button
                className={
                  user.active ? 'border-button-red' : 'border-button-green'
                }
                id="toggle-account"
                onClick={handleToggleAccountSubmit}
              >
                {user.active ? 'Disable' : 'Enable'} Account
              </button>
            </div>
          ) : null}
          {props.admin ? (
            <EditAccount
              handleSubmit={handleEditSubmit}
              handleChange={handleChange}
              clearValues={clearValues}
              setData={setEditAccount}
              data={editAccount}
            />
          ) : null}
        </div>
      ) : null}
      <Loader show={!props.userInit} />
    </section>
  );
};

UserProfile.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userInit: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(UserProfile);

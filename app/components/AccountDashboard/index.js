import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPosts, editUser } from '../../actions';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import CreatePost from './CreatePost';
import EditAccount from './EditAccount';
import Loader from '../Utility/Loader';
import validate from '../../utils/validate';

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
  }, []);
  const logout = (e) => {
    e.preventDefault();

    fetch('/api/user/logout', { method: 'POST' }).then(() => {
      window.location.reload();
    });
  };
  const clearValues = () => {
    setEditAccount({
      show: false,
      field: '',
      email: '',
      username: '',
      bio: bio,
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

    const newErrorMessage = validate.editForm(editAccount, email, username);

    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        toast.error(error);
      });
    } else {
      dispatch(editUser(null, editAccount, email))
        .then((res) => {
          if (res.status === 'success') {
            clearValues();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleCreatePostSubmit = (e) => {
    e.preventDefault();

    const url = '/api/post/create';
    let formData = new FormData();
    const headers = {
      'content-type': 'multipart/form-data',
    };
    let newErrorMessage = [];

    if (createPost.file.name === undefined || createPost.file.name === '') {
      newErrorMessage.push('Please select a file.');
    }
    if (createPost.tags.split(' ').length < 4) {
      newErrorMessage.push(
        'Minimum 4 space separated tags. ie: red race_car bmw m3'
      );
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        toast.error(error);
      });
    } else {
      const urlSearchParams = new URLSearchParams({
        source: createPost.source,
        tags: createPost.tags,
      });
      formData.append('image', createPost.file.value);
      fetch(`${url}?${urlSearchParams}`, {
        method: 'POST',
        headers,
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'success') {
            clearValues();
            dispatch(setPosts({ list: [], page: 1, totalCount: 0 }));
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <section className="container dashboard" id="account-dashboard">
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
            <button
              className="border-button"
              id="create-post"
              onClick={() =>
                setCreatePost({
                  ...createPost,
                  show: true,
                })
              }
            >
              Create Post
            </button>
            <button className="border-button" id="logout" onClick={logout}>
              Log Out
            </button>
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
    </section>
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

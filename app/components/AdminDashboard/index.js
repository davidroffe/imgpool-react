import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { getFlags } from '../../actions';
import TagForm from './TagForm';
import UserSelectForm from './UserSelectForm';
import Loader from '../Utility/Loader';
import settingsApi from '../../api/setting';
import tagsApi from '../../api/tags';
import userApi from '../../api/users';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    admin: state.user.admin,
    userInit: state.user.init,
    flags: state.flags,
  };
};

const Dashboard = ({ history, dispatch, userInit, loggedIn, admin, flags }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [canSignUp, setCanSignUp] = useState(true);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (userInit) {
      if (!loggedIn || !admin) {
        history.push('/account');
      } else {
        retrieveSignUpStatus();
        if (tags.length === 0) retrieveTags();
        if (users.length === 0) retrieveUsers();
        if (flags.length === 0) retrieveflags();
      }
    }
  }, []);

  const retrieveTags = () => {
    tagsApi.fetchTags().then((res) => {
      setTags(res.length ? res : [false]);
    });
  };

  const retrieveUsers = () => {
    userApi.getUsers().then((res) => {
      setUsers(res.length ? res : [false]);
    });
  };

  const retrieveflags = () => {
    dispatch(getFlags());
  };

  const retrieveSignUpStatus = () => {
    settingsApi.signup().then((res) => {
      setCanSignUp(res.signUp);
    });
  };

  const toggleSignup = (e) => {
    e.preventDefault();

    settingsApi
      .toggleSignup()
      .then((res) => {
        setCanSignUp(res.signUp);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleTagSubmit = (url, tagIds) => {
    if (tagIds.length) {
      tagsApi
        .toggleTagState(url, tagIds)
        .then(() => {
          retrieveTags();
          setShowTagForm(!showTagForm);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error('Please select one or more tags.');
    }
  };

  const handleSelectUser = (id) => {
    history.push(`/user/${id}`);
  };

  return (
    <section className="container dashboard" id="account-dashboard">
      <ToastContainer />
      {userInit && loggedIn ? (
        <div className="inner">
          <h1>
            <span>Admin</span>
          </h1>
          <div className="left">
            <h2>Flags</h2>
            <div className="row">
              <p>({flags[0] ? flags.length : '0'})</p>
              {flags[0] ? (
                <Link to="/flags" id="show-flags">
                  manage
                </Link>
              ) : null}
            </div>
            <h2>Users</h2>
            <div className="row">
              <p>({users[0] ? users.length : '0'})</p>
              {users[0] ? (
                <button
                  id="show-users"
                  onClick={() => {
                    setShowUserForm(!showUserForm);
                  }}
                >
                  manage
                </button>
              ) : null}
            </div>
            <h2>Tags</h2>
            <div className="row">
              <p>({tags[0] ? tags.length : '0'})</p>
              {tags[0] ? (
                <button
                  id="show-tags"
                  onClick={() => {
                    setShowTagForm(!showTagForm);
                  }}
                >
                  manage
                </button>
              ) : null}
            </div>
          </div>
          <div className="right">
            <button
              className="border-button"
              id="toggle-signup"
              onClick={toggleSignup}
            >
              {canSignUp ? 'Disable' : 'Enable'} Signups
            </button>
          </div>
          <TagForm
            show={showTagForm}
            toggleShow={setShowTagForm}
            handleSubmit={handleTagSubmit}
            tags={tags}
          />
          <UserSelectForm
            show={showUserForm}
            toggleShow={setShowUserForm}
            handleSelectUser={handleSelectUser}
            users={users}
          />
        </div>
      ) : null}
      <Loader show={!userInit} />
    </section>
  );
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userInit: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  flags: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Dashboard);

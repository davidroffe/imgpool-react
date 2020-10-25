import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUsers, setFlags } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import TagForm from './TagForm';
import UserSelectForm from './UserSelectForm';
import Loader from '../Utility/Loader';
import tagsApi from '../../api/tags';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    admin: state.user.admin,
    users: state.users,
    flags: state.flags,
    userInit: state.user.init,
  };
};

const Dashboard = (props) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [canSignUp, setCanSignUp] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    retrieveSignUpStatus();
  }, []);

  useEffect(() => {
    if (props.userInit) {
      if (!props.loggedIn || !props.admin) {
        props.history.push('/account');
      } else {
        retrieveTags();
        if (!props.users.length) {
          retrieveUsers();
        }
        if (!props.flags.length) {
          retrieveflags();
        }
      }
    }
  });

  const retrieveTags = () => {
    tagsApi.fetchTags().then((res) => {
      props.dispatch(setTags(res.length ? res : [false]));
    });
  };

  const retrieveUsers = () => {
    fetch('/api/user/get', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        props.dispatch(setUsers(res.length ? res : [false]));
      });
  };

  const retrieveflags = () => {
    fetch('/api/post/flag/get/', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        props.dispatch(setFlags(res.length ? res : [false]));
      });
  };

  const retrieveSignUpStatus = () => {
    fetch('/api/setting/signup/', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        setCanSignUp(res.signUp);
      });
  };

  const toggleSignup = (e) => {
    e.preventDefault();

    const url = '/api/setting/signup/toggle';

    fetch(url, {
      method: 'post',
    })
      .then((res) => res.json())
      .then((res) => {
        retrieveTags();
        setCanSignUp(res.signUp);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleTagSubmit = (url, tagIds) => {
    if (tagIds.length) {
      const urlSearchParams = new URLSearchParams({ tagIds });

      fetch(`${url}?${urlSearchParams}`, {
        method: 'post',
      })
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

  return (
    <section className="container dashboard" id="account-dashboard">
      <ToastContainer />
      {props.userInit && props.loggedIn ? (
        <div className="inner">
          <h1>
            <span>Admin</span>
          </h1>
          <div className="left">
            <h2>Flags</h2>
            <div className="row">
              <p>({props.flags[0] ? props.flags.length : '0'})</p>
              {props.flags[0] ? (
                <Link to="/flags" id="show-flags">
                  manage
                </Link>
              ) : null}
            </div>
            <h2>Users</h2>
            <div className="row">
              <p>({props.users[0] ? props.users.length : '0'})</p>
              {props.users[0] ? (
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
            history={props.history}
            users={props.users}
          />
        </div>
      ) : null}
      <Loader show={!props.userInit} />
    </section>
  );
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userInit: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  flags: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Dashboard);

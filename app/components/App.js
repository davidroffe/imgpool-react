import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPostsList, setMenu, setTags } from '../actions';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import AccountDashboard from './AccountDashboard';
import UserProfile from './UserProfile';
import PasswordReset from './PasswordReset';
import PostSearch from './PostSearch';
import PostList from './PostList';
import PostSingle from './PostSingle';
import FlagList from './FlagList';
import About from './About';
import Login from './Login';
import Auth from './Utility/Auth';
import NotFound from './NotFound';
import apiUtil from '../utils/api';
import tagUtil from '../utils/tags';

const mapStateToProps = (state) => {
  return {
    searchQuery: state.search,
    menus: state.menus,
  };
};

const App = (props) => {
  const handleSearch = (e, history) => {
    e.preventDefault();

    apiUtil.search(props.searchQuery).then((res) => {
      props.dispatch(setPostsList(res.data));
      props.dispatch(setTags(tagUtil.getTagsFromPosts(res.data)));
      history.push('/posts');
    });
  };

  const handleClick = () => {
    for (const menu in props.menus) {
      if (props.menus.hasOwnProperty(menu) && props.menus[menu]) {
        props.dispatch(
          setMenu(
            `${menu.replace(
              /[A-Z]/g,
              (letter) => `_${letter.toLowerCase()}`
            )}_MENU`,
            false
          )
        );
      }
    }
  };
  return (
    <div onClick={handleClick}>
      <Router>
        <Auth>
          <Header>
            <PostSearch handleSearch={handleSearch} />
          </Header>
          <Switch>
            <Route path="/posts" exact component={PostList} />
            <Route path="/post/:id" component={PostSingle} />
            <Route path="/account" exact component={AccountDashboard} />
            <Route
              path="/password-reset/:passwordResetToken"
              exact
              component={PasswordReset}
            />
            <Route path="/admin" exact component={AdminDashboard} />
            <Route path="/user/:id" exact component={UserProfile} />
            <Route path="/flags" exact component={FlagList} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Redirect from="/" exact to="/posts" />
            <Route component={NotFound} />
          </Switch>
        </Auth>
      </Router>
    </div>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  menus: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(App);

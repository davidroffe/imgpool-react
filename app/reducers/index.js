import { combineReducers } from 'redux';
import post from './post';
import posts from './posts';
import tags from './tags';
import search from './search';
import user from './user';
import users from './users';
import flags from './flags';
import menus from './menus';

export default combineReducers({
  post,
  posts,
  tags,
  search,
  user,
  users,
  flags,
  menus,
});

import { combineReducers } from 'redux';
import posts from './posts';
import tags from './tags';
import search from './search';
import user from './user';
import users from './users';
import flags from './flags';
import tagMenu from './tagMenu';

export default combineReducers({
  posts,
  tags,
  search,
  user,
  users,
  flags,
  tagMenu,
});

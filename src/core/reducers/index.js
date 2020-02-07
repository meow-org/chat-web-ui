import { combineReducers } from 'redux';
import users from './users';
import socket from './socket';
import messages from './messages';

export default combineReducers({
  users,
  socket,
  messages,
});

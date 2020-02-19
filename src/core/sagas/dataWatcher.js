import { eventChannel } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import io from 'socket.io-client';
import { socketConnect } from '../actions/socket';
import history from '../history';
import { SOCKET, SERVER_CONST, URLS } from '../../conf';
import {
  SET_CURRENT_USER,
  SET_USERS,
  SET_USER_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS,
} from '../constants/users';
import { SET_MESSAGES, SET_MESSAGE_SAGA } from '../constants/messages';

const RELATION = {
  [SERVER_CONST.DATA.GET_CURRENT_USER]: SET_CURRENT_USER,
  [SERVER_CONST.DATA.GET_USERS]: SET_USERS,
  [SERVER_CONST.DATA.GET_MESSAGES_FOR_USER]: SET_MESSAGES,
  [SERVER_CONST.DATA.SET_MESSAGE]: SET_MESSAGE_SAGA,
  [SERVER_CONST.DATA.GET_NOTIFICATIONS]: SET_USER_NOTIFICATIONS,
  [SERVER_CONST.DATA.UPDATE_NOTIFICATIONS]: UPDATE_NOTIFICATIONS,
};

const Socket = () => {
  let socket = null;

  const connect = (url, opt) => {
    socket = io.connect(url, opt);
    return new Promise(resolve => {
      socket.on('disconnect', reason => {
        if (reason === 'io server disconnect') {
          history.push(URLS.SIGN_IN);
        }
      });
      socket.on('connect', () => {
        resolve(socket);
      });
    });
  };

  function* init() {
    yield connect(SOCKET.CONNECTION_URL, { reconnect: true });
    yield put(socketConnect());
  }

  const createDataListener = () => {
    const subscribe = emitter => {
      socket.on(SOCKET.DATA, emitter);

      return () => socket.removeListener(SOCKET.DATA, emitter);
    };

    return eventChannel(subscribe);
  };

  const dataEmit = action => {
    socket.emit(SOCKET.DATA, action);
  };

  function* dataChanel() {
    const channel = yield call(createDataListener);

    while (true) {
      const message = yield take(channel);
      const data = JSON.parse(message);
      if(data.forType && RELATION[data.forType]){
        yield put({ type: RELATION[data.forType], ...data });
      }
    }
  }

  return {
    init,
    dataEmit,
    dataChanel,
  };
};

export default Socket();

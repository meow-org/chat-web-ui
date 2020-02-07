import { fork, takeEvery, call } from 'redux-saga/effects';
import socket from './dataWatcher';
import messagesSaga from './messages';
import { SERVER_CONST } from '../../conf';
import { INIT_SOCKET } from '../constants/socket';

function* init() {
  yield call(socket.init);
  yield fork(socket.dataChanel);
}

export function* sagas() {
  yield takeEvery(INIT_SOCKET, init);
  yield takeEvery(Object.values(SERVER_CONST.DATA), socket.dataEmit);
  yield fork(messagesSaga);
}

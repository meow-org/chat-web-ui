import { takeEvery, select, put } from 'redux-saga/effects';
import { SET_MESSAGE_SAGA } from '../constants/messages';
import { pushMessage } from '../actions/messages';

export function* resolveNewMessage(action) {
  // eslint-disable-next-line camelcase
  const { user_from_id, user_to_id } = action.payload;
  const selectedUserId = yield select(({ messages }) => messages.selectedUserId);

  console.log(selectedUserId, user_from_id, user_to_id)

  // eslint-disable-next-line camelcase,no-undef
  if (selectedUserId === user_from_id || selectedUserId === user_to_id) {
    yield put(pushMessage(action.payload));
  }
}

export default function*() {
  yield takeEvery(SET_MESSAGE_SAGA, resolveNewMessage);
}

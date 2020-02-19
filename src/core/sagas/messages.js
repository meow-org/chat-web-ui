import { takeEvery, select, put } from 'redux-saga/effects';
import { SET_MESSAGE_SAGA } from '../constants/messages';
import { pushMessage } from '../actions/messages';
import { updateNotifications } from '../actions/users';
import { setMessageAsRead } from '../actions/server';

export function* resolveNewMessage(action) {
  // eslint-disable-next-line camelcase
  const { user_from_id, user_to_id, id } = action.payload;
  const selectedUserId = yield select(({ messages }) => messages.selectedUserId);
  // eslint-disable-next-line camelcase,no-undef
  if (selectedUserId === user_from_id || selectedUserId === user_to_id) {
    yield put(pushMessage(action.payload));
    if(selectedUserId === user_to_id){
      yield put(setMessageAsRead(id))
    }
  }
  else {
    const notifications = yield select(({ users }) => users.notifications);
    console.log(user_from_id, (notifications[user_from_id] || 0) + 1)
     yield put(updateNotifications({[user_from_id] : (notifications[user_from_id] || 0) + 1}));
  }
}

export default function*() {
  yield takeEvery(SET_MESSAGE_SAGA, resolveNewMessage);
}

import { SERVER_CONST } from '../../conf';

export const getMessagesForUser = ({ id }) => ({
  type: SERVER_CONST.DATA.GET_MESSAGES_FOR_USER,
  payload: {
    id,
  },
});

export const getUsersServer = ({ search, offset } = {}) => ({
  type: SERVER_CONST.DATA.GET_USERS,
  payload: {
    search,
    offset,
  },
});

export const getCurrentUserServer = () => ({
  type: SERVER_CONST.DATA.GET_CURRENT_USER,
});

export const sendMessageServer = ({ id, text }) => ({
  type: SERVER_CONST.DATA.SET_MESSAGE,
  payload: {
    id,
    text,
  },
});

export const getNotificationsServer = () => ({
  type: SERVER_CONST.DATA.GET_NOTIFICATIONS,
});

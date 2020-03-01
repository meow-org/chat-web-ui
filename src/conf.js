export const URLS = {
  SIGN_IN: '/sign-in',
  MAIN: '/',
  CHANGE_PASSWORD: '/change-password',
  VALIDATE_PASSWORD: '/validate-password/:email/:email_token',
  SIGN_UP: '/sign-up',
  VALIDATE_EMAIL: '/validate-email/:email_token'
};

export const API = {
  LOGIN: '/api/auth/login',
  REGISTRATION: '/api/auth/registration',
  VALIDATE_EMAIL: '/api/auth/validate-email',
  CHANGE_PASSWORD: '/api/auth/change-password',
  VALIDATE_NEW_PASS: '/api/auth/validate-new-password',
  LOGOUT: '/api/auth/logout',
  UPLOAD_FILE_MESSAGE: '/api/upload/message/file',
};

export const SOCKET = {
  CONNECTION_URL: '/websocket/chat',
  DATA: 'data',
};

export const SERVER_CONST = {
  DATA: {
    GET_USERS: '@SERVER/GET_USERS',
    GET_CURRENT_USER: '@SERVER/GET_CURRENT_USER',
    GET_MESSAGES_FOR_USER: '@SERVER/GET_MESSAGES_FOR_USER',
    SET_MESSAGE: '@SERVER/SET_MESSAGE',
    GET_NOTIFICATIONS: '@SERVER/GET_NOTIFICATIONS',
    UPDATE_NOTIFICATIONS: '@SERVER/UPDATE_NOTIFICATIONS',
    SET_MESSAGE_READ: '@SERVER/SET_MESSAGE_READ'
  },
  CONNECT: '@SERVER/USER_CONNECT',
  DISCONNECT: '@SERVER/USER_DISCONNECT',
};

export const UPLOAD_PATHS = {
  DOCUMENTS: {
    SOURCE: '/static/upload/documents/source/',
    MIN: '/static/upload/documents/minimization/',
  },
};

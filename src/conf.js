export const URLS = {
  SIGN_IN: '/sign-in',
  MAIN: '/',
  CHANGE_PASSWORD: '/change-password',
  SIGN_UP: '/sign-up',
};

export const API = {
  LOGIN: '/api/auth/login',
  REGISTRATION: '/api/auth/registration',
  VALIDATE_EMAIL: '/api/auth/validate-email',
  LOGOUT: '/api/logout',
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
    SET_NOTIFICATION: '@SERVER/SET_NOTIFICATION',
  },
  CONNECT: '@SERVER/USER_CONNECT',
  DISCONNECT: '@SERVER/USER_DISCONNECT',
};

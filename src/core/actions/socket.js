import {
  INIT_SOCKET,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
} from '../constants/socket';

export const initSocket = () => ({
  type: INIT_SOCKET,
});

export const socketConnect = () => ({
  type: SOCKET_CONNECT,
});

export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});

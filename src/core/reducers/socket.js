import { SOCKET_DISCONNECT, SOCKET_CONNECT } from '../constants/socket';

const initState = {
  connected: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SOCKET_CONNECT:
      return { ...state, connected: true };
    case SOCKET_DISCONNECT:
      return { ...state, connected: false };
    default:
      return state;
  }
};

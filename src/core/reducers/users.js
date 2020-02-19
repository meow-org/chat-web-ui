import {
  SET_USERS,
  USER_CONNECT,
  USER_DISCONNECT,
  SET_CURRENT_USER,
  SET_USER_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS,
} from '../constants/users';

const initState = {
  current: null,
  data: [],
  count: 0,
  search: '',
  notifications: {},
};

const setOnline = (data, id) => {
  return data.map(d => (d.id === id ? { ...d, online: true } : d));
};

const setOffline = (data, id) => {
  return data.map(d => (d.id === id ? { ...d, online: false } : d));
};

const setUsers = (state, { data, count, offset, search }) => {
  let newData = data;
  if (offset) {
    newData = [...state.data, ...data];
  }
  return {
    ...state,
    data: newData,
    count,
    search,
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USERS:
      return setUsers(state, action.payload);
    case SET_CURRENT_USER:
      return {
        ...state,
        current: action.payload.current,
      };
    case USER_CONNECT:
      return {
        ...state,
        data: setOnline(state.data, action.payload.id),
      };
    case USER_DISCONNECT:
      return {
        ...state,
        data: setOffline(state.data, action.payload.id),
      };
    case SET_USER_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
      };
    case UPDATE_NOTIFICATIONS: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload.notifications,
        },
      };
    }

    default:
      return state;
  }
};

import { SET_MESSAGES, PUSH_NEW_MESSAGE } from '../constants/messages';

const initState = {
  users: null,
  data: [],
  selectedUserId: null,
  count: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    case PUSH_NEW_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        count: state.count + 1,
      };
    default:
      return state;
  }
};

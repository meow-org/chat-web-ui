import { PUSH_NEW_MESSAGE } from '../constants/messages';

// eslint-disable-next-line camelcase
export const pushMessage = ({ text, user_from_id, user_to_id, id }) => ({
  type: PUSH_NEW_MESSAGE,
  payload: {
    text,
    user_from_id,
    user_to_id,
    id,
  },
});

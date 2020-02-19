import { UPDATE_NOTIFICATIONS } from '../constants/users';

export const updateNotifications = notifications => ({
  type: UPDATE_NOTIFICATIONS,
  payload: {
    notifications,
  }
});

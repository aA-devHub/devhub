import * as NotificationAPI from '../util/notification_api_util';

export const CLEAR_NOTIFICATION_ERRORS = 'CLEAR_NOTIFICATION_ERRORS';
export const RECEIVE_NOTIFICATION_ERRORS = 'RECEIVE_NOTIFICATION_ERRORS';
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';

export const clearNotificationErrors = () => ({
  type: CLEAR_NOTIFICATION_ERRORS,
});

export const receiveNotificationErrors = (errors) => ({
  type: RECEIVE_NOTIFICATION_ERRORS,
  errors,
});

export const receiveNotifications = (user) => ({
  type: RECEIVE_NOTIFICATIONS,
  user,
});

export const fetchNotifications = () => (dispatch) => {
  return NotificationAPI.fetchNotifications()
    .then((user) => dispatch(receiveNotifications(user.data)))
    .catch((errors) =>
      dispatch(receiveNotificationErrors(errors.response.data))
    );
};

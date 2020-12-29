import * as UserAPI from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const clearUserErrors = () => ({
  type: CLEAR_USER_ERRORS,
});

export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const fetchUsers = () => (dispatch) => {
  UserAPI.fetchUsers()
    .then((users) => {
      dispatch(clearUserErrors());
      dispatch(receiveUsers(users.data));
    })
    .catch((errors) => dispatch(receiveUserErrors(errors.response.data)));
};

export const updateUser = (user) => (dispatch) => {
  UserAPI.updateUser(user)
    .then((res) => dispatch(receiveUser(res.data)))
    .catch((errors) => dispatch(receiveUserErrors(errors.response.data)));
};

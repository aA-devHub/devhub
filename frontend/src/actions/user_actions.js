import * as UserAPI from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (payload) => ({
  type: RECEIVE_USER,
  payload,
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
  return UserAPI.fetchUsers()
    .then((users) => {
      dispatch(clearUserErrors());
      dispatch(receiveUsers(users.data));
    })
    .catch((errors) => dispatch(receiveUserErrors(errors.response.data)));
};

export const fetchUser = (userId) => (dispatch) => {
  return UserAPI.fetchUser(userId)
    .then((res) => {
      dispatch(clearUserErrors());
      dispatch(receiveUser(res.data));
    })
    .catch((errors) => dispatch(receiveUserErrors(errors.response.data)));
};

export const updateUser = (user) => (dispatch) => {
  return UserAPI.updateUser(user)
    .then((res) => dispatch(receiveUser(res.data)))
    .catch((errors) => dispatch(receiveUserErrors(errors.response.data)));
};

// DEPRECATED, lol
export const userAddFavorite = (user, projectId) => (dispatch) => {
  if (!user.favorites.includes(projectId)) {
    return dispatch(
      updateUser({
        id: user._id,
        favorites: user.favorites.concat([projectId]),
        newFavorite: projectId,
      })
    );
  }
  return null;
};

export const removeFavorite = (user, projectId) => (dispatch) => {
  return dispatch(
    updateUser({
      id: user._id,
      favorites: user.favorites.filter((x) => x !== projectId),
      oldFavorite: projectId,
    })
  );
};

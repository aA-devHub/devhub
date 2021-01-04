export const RECEIVE_ORDERING = 'RECEIVE_ORDERING';

export const receiveOrdering = (order) => ({
  type: RECEIVE_ORDERING,
  order,
});

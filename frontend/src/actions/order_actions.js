export const RECEIVE_ORDER = 'RECEIVE_ORDER';

export const setOrder = (order) => ({
  type: RECEIVE_ORDER,
  order,
});

import { RECEIVE_ORDER } from '../../actions/order_actions';

export default (state = 'popularity', action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return action.order;

    default:
      return state;
  }
};

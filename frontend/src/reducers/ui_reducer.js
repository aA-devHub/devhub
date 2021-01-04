import { combineReducers } from 'redux';

import search from './ui/search_reducer';
import tags from './ui/tags_reducer';
import order from './ui/order_reducer';

export default combineReducers({
  search,
  tags,
  order,
});

import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default;
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    process.env.NODE_ENV !== 'production'
      ? require('redux-devtools-extension').composeWithDevTools(
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;

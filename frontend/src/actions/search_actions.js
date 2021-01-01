import * as SearchAPI from '../util/search_api_util';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'RECEIVE_SEARCH_ERRORS';

export const receiveSearchErrors = (errors) => ({
  type: RECEIVE_SEARCH_ERRORS,
  errors,
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const receiveSearchResults = (results) => ({
  type: RECEIVE_SEARCH_RESULTS,
  results,
});

export const fetchSearchResults = (data) => (dispatch) => {
  return SearchAPI.fetchSearchResults(data)
    .then((results) => dispatch(receiveSearchResults(results)))
    .catch((errors) => dispatch(receiveSearchErrors(errors)));
};

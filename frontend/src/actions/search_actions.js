export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const setSearch = (search) => ({
  type: RECEIVE_SEARCH,
  search,
});

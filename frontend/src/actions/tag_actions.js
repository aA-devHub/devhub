export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

export const removeTag = (tag) => ({
  type: REMOVE_TAG,
  tag,
});

export const receiveTag = (tag) => ({
  type: RECEIVE_TAG,
  tag,
});

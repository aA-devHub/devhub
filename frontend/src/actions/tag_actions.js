export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const CLEAR_TAGS = 'CLEAR_TAGS';

export const clearTags = () => ({
  type: CLEAR_TAGS,
});

export const removeTag = (tag) => {
  return {
    type: REMOVE_TAG,
    tag,
  };
};

export const addTag = (tag) => ({
  type: RECEIVE_TAG,
  tag,
});

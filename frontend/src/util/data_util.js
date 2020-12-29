// Convert object array from mongo to hash with _id as keys
export const toHashById = (ary) => {
  let res = {};
  for (let obj of ary) {
    res[obj._id] = obj;
  }
  return res;
};

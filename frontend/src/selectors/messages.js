import moment from 'moment';

export const getMessages = (messages) => {
  let res = Object.values(messages).sort((a, b) => a.createdAt < b.createdAt);
  for (let val of res) {
    val.createdAt = moment(val.createdAt).format('MMM D, YYYY, LTS');
  }
  return res;
};

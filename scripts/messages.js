#! /usr/bin/env node
'use strict';

const yargs = require('yargs');
const fs = require('fs');
const faker = require('faker');

const createMessage = (from, to) => {
  const date = faker.date.recent();
  return {
    from,
    to,
    read: false,
    body: faker.hacker.phrase(),
    createdAt: date,
    updatedAt: date,
  };
};

// shuffle array
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const randomPair = (ids) => shuffle(ids).slice(0, 2);

const generateMessages = (count, ids) => {
  const userIds = ids instanceof Array ? ids : ids.split(',');
  let res = [];
  for (let i = 0; i < count; i++) {
    const [id1, id2] = randomPair(userIds);
    res.push(createMessage(id1, id2));
  }
  return res;
};

const argv = yargs
  .command('count', 'Number of messages to generate', {
    count: {
      description: 'Number of messages',
      alias: 'c',
      type: 'number',
    },
  })
  .command('ids', 'IDs of users sending/receiving messages', {
    ids: {
      description: 'Comma-separated list of user IDs',
      type: 'string',
    },
  })
  .help()
  .alias('help', 'h').argv;

if (argv.hasOwnProperty('count')) {
  const { count, ids } = argv;
  const messages = generateMessages(count, ids);

  const jsonObj = JSON.stringify(messages);
  fs.writeFileSync('./data/messagedata.json', jsonObj);
}

module.exports = {
  generateMessages,
};

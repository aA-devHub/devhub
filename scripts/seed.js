#! /usr/bin/env node
'use strict';

const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const path = require('path');
const yargs = require('yargs');

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Project = require('../models/Project');

const { generateMessages } = require('../scripts/messages');
const {
  findOrCreateConversation,
  addMessageToConversation,
} = require('../routes/api/messages');

const seed = (numMsg, userIds = 10) => {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(async () => {
      console.log('Connected to MongoDB successfully');

      // Users
      // await User.deleteMany({ });

      // Projects
      // await Project.deleteMany({ });
      try {
      } catch (err) {
        console.log(err);
      }

      // Comments
      // try {
      //   await Comment.deleteMany({});
      // } catch (_) {
      //   // return ;
      //   console.log('Skipping comments');
      // }

      // Messages/Conversations
      try {
        // const messages = require('../data/messagedata.json');
        // console.dir(messages);

        // Cleanup any bad data
        let res = await Message.deleteMany({
          $or: [{ createdAt: null }, { conversation: null }, { from: null }],
        });
        if (res.ok === 1) {
          console.log('Removed bad messages');
        }

        // Uncomment to reset conversations + messages
        // await Message.deleteMany({});
        // await Conversation.deleteMany({});
        // await User.updateMany(
        //   {},
        //   { $set: { conversations: [] } },
        //   { upsert: true }
        // );

        let userIds = await User.find({}, { _id: 1 }).then((ids) =>
          ids.map((id) => id._id)
        );
        console.log(userIds);

        const messages = generateMessages(numMsg, userIds);

        for (let msg of messages) {
          let conversation = await findOrCreateConversation(msg.to, msg.from);
          console.log('Conversation: ', conversation);

          const message = await Message.create({
            ...msg,
            conversation: conversation._id,
          });

          await addMessageToConversation(msg.from, message, conversation);
        }
      } catch (err) {
        console.error(err.message);
        console.log('No message data... skipping seeding messages');
      }

      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
};

const argv = yargs
  .command('num_msg', 'Number of messages', {
    num_msg: {
      description: 'Number of messages to generate',
      alias: 'm',
      default: 0,
      type: 'number',
    },
  })
  .help()
  .alias('help', 'h').argv;

seed(argv.num_msg);

#! /usr/bin/env node
'use strict';

const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const path = require('path');

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const {
  findOrCreateConversation,
  addMessageToConversation,
} = require('../routes/api/messages');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB successfully');

    // Messages/Conversations
    try {
      const messages = require('../data/messagedata.json');
      console.dir(messages);

      // Cleanup any bad data
      let res = await Message.deleteMany({
        $or: [{ createdAt: null }, { conversation: null }],
      });
      if (res.ok === 1) {
        console.log('Removed bad messages');
      }

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

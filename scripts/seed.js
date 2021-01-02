#! /usr/bin/env node
'use strict';

const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const Message = require('../models/Message');
const messages = require('../data/messagedata.json');

console.dir(messages);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB successfully');

    // Messages
    let res = await Message.deleteMany({ createdAt: null });
    if (res.ok === 1) {
      console.log('Removed messages with no timestamp');
    }

    const msgs = messages.map((msg) => new Message(msg));
    res = await Message.collection.insertMany(msgs);

    mongoose.connection.close();
  })
  .catch((err) => console.log(err));

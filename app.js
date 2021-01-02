const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const projects = require('./routes/api/projects');
const comments = require('./routes/api/comments');
const messages = require('./routes/api/messages').router;
const notifications = require('./routes/api/notifications');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/comments', comments);
app.use('/api/messages', messages);
app.use('/api/notifications', notifications);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    returnOriginal: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

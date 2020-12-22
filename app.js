const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const passport = require('passport');
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

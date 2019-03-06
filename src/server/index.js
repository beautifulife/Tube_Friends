const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Users = require('./models/User');

const app = express();

const { DB_URI } = process.env;
const mongodbUri = DB_URI;

mongoose.connect(mongodbUri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success db connect');
});

app.use(express.static('dist'));
app.use(express.json());

app.post('/api/login', (req, res, next) => {
  console.log(req.body);

  const { uid, displayName, photoURL, email } = req.body;

  Users.findOne({ uid }, (err, user) => {
    if (err) {
      console.error(err);
      return next(createError(500));
    }

    if (user) {
      return res.json({
        message: 'log in success'
      });
    }

    const newUser = new Users({
      uid,
      displayName,
      photoURL,
      email
    });

    newUser.save((err) => {
      console.error(err);
      if (err) {
        return next(createError(500));
      }

      res.json({
        message: 'sign up success'
      });
    });
  });
});

app.listen(5000, () => console.log('Listening on port 5000!'));

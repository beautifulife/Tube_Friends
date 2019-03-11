const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { verifyIdToken } = require('./middlewares/firebase');
const verifyAccessToken = require('./middlewares/verifyAccessToken');
const verifySearchKeyword = require('./middlewares/verifySearchKeyword');

const {
  createStory,
  getStories,
  searchStories
} = require('./controllers/storyController');
const {
  authenticateUser,
  getFeed,
  subscribeUser
} = require('./controllers/userController');
const {
  getCategories,
  _createCategories
} = require('./controllers/categoryController');

const { DB_URI } = process.env;

mongoose.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success db connect');
});

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.post('/api/auth', authenticateUser);

app.get('/api/categories', getCategories);
app.post('/api/categories/new', _createCategories);

app.get('/api/stories', getStories);
app.post('/api/stories/new', verifyAccessToken, verifyIdToken, createStory);
app.get('/api/search', verifySearchKeyword, searchStories);

app.get('/api/users/:username/feed', verifyAccessToken, verifyIdToken, getFeed);
app.put(
  '/api/users/:username/subscribe',
  verifyAccessToken,
  verifyIdToken,
  subscribeUser
);

app.listen(5000, () => console.log('Listening on port 5000!'));

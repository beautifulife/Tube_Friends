const express = require('express');
const index = require('./routers');
require('./database/mongoose');

const verifyAccessToken = require('./middlewares/verifyAccessToken.js');
const verifySearchKeyword = require('./middlewares/verifySearchKeyword.js');
const verifyIdToken = require('./middlewares/firebase.js');
const {
  createStory,
  getStories,
  getStory,
  searchStories,
  toggleLike
} = require('./controllers/storyController');
const {
  authenticateUser,
  getFeed,
  toggleSubscribe
} = require('./controllers/userController');
const {
  getCategories,
  _createCategories
} = require('./controllers/categoryController');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.post('/api/auth', authenticateUser);

app.get('/api/categories', getCategories);
app.post('/api/categories/new', _createCategories);

app.get('/api/stories', getStories);
app.get('/api/stories/:story_id', getStory);
app.post('/api/stories/new', verifyAccessToken, verifyIdToken, createStory);
app.put(
  '/api/stories/:story_id/like',
  verifyAccessToken,
  verifyIdToken,
  toggleLike
);
app.get('/api/search', verifySearchKeyword, searchStories);

app.get('/api/users/:user_id/feed', verifyAccessToken, verifyIdToken, getFeed);
app.put(
  '/api/users/:target_user_id/subscription',
  verifyAccessToken,
  verifyIdToken,
  toggleSubscribe
);

app.use('/', index);

app.listen(process.env.PORT || 8081, () => console.log('Listening on port 8080!'));

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { verifyIdToken } = require('./middlewares/firebase');
const verifyAccessToken = require('./middlewares/verifyAccessToken');
const verifySearchKeyword = require('./middlewares/verifySearchKeyword');

const Users = require('./models/User');
const Categories = require('./models/Category');
const Stories = require('./models/Story');
const UserAssets = require('./models/UserAsset');

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

app.post(
  '/api/stories/new',
  verifyAccessToken,
  verifyIdToken,
  async (req, res, next) => {
    const uid = res.locals.uid;
    const { categoryId, title, content, summary, link, thumbnail } = req.body;

    try {
      const newStory = new Stories({
        uid,
        categoryId,
        title,
        content,
        summary,
        link,
        thumbnail
      });

      await newStory.save();

      res.send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }
);

app.get('/api/stories', async (req, res, next) => {
  const sort = req.query.sort || 'hottest';
  const category = req.query.category || 'all';
  const page = req.query.page || 1;
  let categoryId;
  let stories;

  try {
    if (category === 'all') {
      if (sort === 'hottest') {
        stories = await Stories.find()
          .where('createdAt').gt(new Date(Date.now() - 24 * 60 * 60 * 1000))
          .sort('-like')
          .skip((page - 1) * 30)
          .limit(page * 30);
      } else if (sort === 'newest') {
        stories = await Stories.find()
          .sort('-createdAt')
          .skip((page - 1) * 30)
          .limit(page * 30);
      }
    } else {
      categoryId = await Categories.findOne()
        .where('title').equals(category)
        .select('channelId');

      if (sort === 'hottest') {
        stories = await Stories.find()
          .where('categoryId').equals(categoryId)
          .where('createdAt').gt(new Date(Date.now() - 24 * 60 * 60 * 1000))
          .sort('-like')
          .skip((page - 1) * 30)
          .limit(page * 30);
      } else if (sort === 'newest') {
        stories = await Stories.find()
          .where('categoryId').equals(categoryId)
          .sort('-createdAt')
          .skip((page - 1) * 30)
          .limit(page * 30);
      }
    }

    res.json({
      sort,
      category,
      page,
      stories
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
});

app.get(
  '/api/users/:username/feed',
  verifyAccessToken,
  verifyIdToken,
  async (req, res, next) => {
    const uid = res.locals.uid;
    const username = req.params.username.split('@')[1];
    const page = req.query.page || 1;

    const user = await Users.findOne()
      .where('uid').equals(uid)
      .select('-_id username');

    console.log(uid, username, user);

    if (username !== user.username) {
      console.log('forbidden feed request occured', username);
      return next(createError(403));
    }

    const stories = await Stories.find()
      .where('uid').equals(uid)
      .sort('-createdAt')
      .skip((page - 1) * 30)
      .limit(page * 30);

    res.json({
      username,
      page,
      stories
    });
  }
);

app.get('/api/search', verifySearchKeyword, async (req, res, next) => {
  try {
    const page = res.locals.page;
    const keyword = res.locals.keyword;

    const stories = await Stories.find({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: 'i'
          }
        },
        {
          summary: {
            $regex: keyword,
            $options: 'i'
          }
        }
      ]
    });

    res.json({
      stories,
      page
    });
  } catch (err) {
    console.error(err);
    return next(createError(500));
  }
});

app.post('/api/auth', async (req, res, next) => {
  const { uid, displayName, photoURL, email } = req.body;

  if (!(uid && displayName && photoURL && email)) {
    console.log('invalid request occured');
    return next(createError(400));
  }

  try {
    const user = await Users.findOne({ uid });

    if (user) {
      return res.json({
        user: req.body
      });
    }

    const username = email.split('@')[0];
    const newUser = new Users({
      uid,
      photoURL,
      email,
      username
    });

    await newUser.save();

    res.json({
      user: req.body
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
});

app.get('/api/categories', async (req, res, next) => {
  try {
    const categories = await Categories.find({}, 'title');

    res.json({
      categories
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
});

app.post('/api/admin/categories', async (req, res, next) => {
  const categories = req.body.items;

  console.log(categories);
  try {
    await categories.forEach(async category => {
      try {
        const newCategory = new Categories({
          channelId: category.snippet.channelId,
          title: category.snippet.title
        });

        await newCategory.save();
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }

  res.json({
    categories
  });
});

app.listen(5000, () => console.log('Listening on port 5000!'));

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { verifyIdToken } = require('./middlewares/firebase');
const verifyAccessToken = require('./middlewares/verifyAccessToken');

const Users = require('./models/User');
const Categories = require('./models/Category');
const Stories = require('./models/Story');

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

app.get('/api/search', async (req, res, next) => {
  console.log(req.query);
  try {
    let keyword = req.query.keyword;

    if (keyword.match(/[^a-zA-Z0-9\s]|\s\s/)) {
      keyword = keyword.replace(/[^a-zA-Z0-9\s]/g, '');
      keyword = keyword.replace(/\s\s/g, ' ');

      console.log('invalid character');
    }

    if (keyword.trim().length < 2) {
      console.log('invalid character');
      return next(createError(400));
    }

    const page = req.query.page || 1;

    if (typeof keyword === 'undefined' || keyword.length < 2) {
      return next(createError(400));
    }

    try {
      console.log(keyword);
      const stories = await Stories.find({
        $or: [
          {
            title: {
              $regex: keyword,
              $options: 'ig'
            }
          },
          {
            summary: {
              $regex: keyword,
              $options: 'ig'
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
  } catch (err) {
    console.error(err);
    return next(createError(400));
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

    const newUser = new Users({
      uid,
      displayName,
      photoURL,
      email
    });

    await newUser.save();

    res.json({
      user: req.body
    });
  } catch (err) {
    console.error(err);
    return next(createError(500));
  }
});

app.get('/api/categories', async (req, res, next) => {
  const categories = await Categories.find({}, 'title');

  res.json({
    categories
  });
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

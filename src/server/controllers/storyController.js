const createError = require('http-errors');
const mongoose = require('mongoose');
const Categories = require('../models/Category');
const Stories = require('../models/Story');
const Users = require('../models/User');

const createStory = async (req, res, next) => {
  try {
    const uid = res.locals.uid;
    const { categoryId, title, content, link } = req.body;
    const thumbnail = req.body.thumbnail || 'https://i.imgur.com/sshNOm6.png';

    if (!(categoryId && title && content && link)) {
      return next(createError(400));
    }

    const userId = await Users.findOne()
      .where('uid')
      .equals(uid)
      .select('_id');

    if (!userId) {
      return next(createError(400));
    }

    const summary = content.slice(0, 200);

    const newStory = new Stories({
      userId,
      categoryId,
      title,
      content,
      summary,
      link,
      thumbnail
    });

    await newStory.save();

    await Users.findOneAndUpdate(
      { _id: userId._id },
      { $push: { stories: newStory._id } }
    );

    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getStories = async (req, res, next) => {
  try {
    const sort = req.query.sort || 'hottest';
    const category = req.query.category || 'all';
    const page = req.query.page || 1;
    let categoryId;
    let stories;

    if (category === 'all') {
      if (sort === 'hottest') {
        stories = await Stories.find()
          .where('createdAt')
          .gt(new Date(Date.now() - 24 * 60 * 60 * 1000))
          .sort('-like -createdAt')
          .select('-content -link')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', 'username')
          .populate('categoryId', 'title')
          .populate('like', 'username uid');
      } else if (sort === 'newest') {
        stories = await Stories.find()
          .sort('-createdAt')
          .select('-content -link')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', 'username')
          .populate('categoryId', 'title')
          .populate('like', 'username uid');
      }
    } else {
      categoryId = await Categories.findOne()
        .where('title')
        .equals(category)
        .select('_id');

      if (sort === 'hottest') {
        stories = await Stories.find()
          .where('categoryId')
          .equals(categoryId._id)
          .where('createdAt')
          .gt(new Date(Date.now() - 24 * 60 * 60 * 1000))
          .sort('-like -createdAt')
          .select('-content -link')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', 'username')
          .populate('categoryId', 'title')
          .populate('like', 'username uid');
      } else if (sort === 'newest') {
        stories = await Stories.find()
          .where('categoryId')
          .equals(categoryId._id)
          .sort('-createdAt')
          .select('-content -link')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', 'username')
          .populate('categoryId', 'title')
          .populate('like', 'username uid');
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
};

const getStory = async (req, res, next) => {
  try {
    const storyId = req.params.story_id;

    if (!storyId) {
      return next(createError(400));
    }

    const story = await Stories.findOne()
      .where('_id')
      .equals(storyId)
      .populate('userId', 'username')
      .populate('categoryId', 'title')
      .populate('like', 'username uid');

    if (!story) {
      return next(createError(404));
    }

    res.json({
      story
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

const searchStories = async (req, res, next) => {
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
    })
      .select('-content -link')
      .populate('userId', 'username')
      .populate('categoryId', 'title')
      .populate('like', 'username uid');

    res.json({
      stories,
      page
    });
  } catch (err) {
    console.error(err);
    return next(createError(500));
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const uid = res.locals.uid;
    const storyId = req.params.story_id;
    const action = req.body.action;
    const method = action === 'remove' ? '$pull' : '$push';

    if (!(action && mongoose.Types.ObjectId.isValid(storyId))) {
      return next(createError(400));
    }

    const user = await Users.findOne()
      .where('uid')
      .equals(uid)
      .select('_id uid username');

    const story = await Stories.findOneAndUpdate({
      [method]: { like: user._id }
    })
      .where('_id')
      .equals(storyId);

    res.json({
      user
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

module.exports = {
  createStory,
  getStories,
  getStory,
  searchStories,
  toggleLike
};

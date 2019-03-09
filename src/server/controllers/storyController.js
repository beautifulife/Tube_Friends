const createError = require('http-errors');
const Categories = require('../models/Category');
const Stories = require('../models/Story');
const Users = require('../models/User');

const createStory = async (req, res, next) => {
  const uid = res.locals.uid;
  const { categoryId, title, content, summary, link, thumbnail } = req.body;

  try {
    const userId = await Users.findOne()
      .where('uid').equals(uid)
      .select('_id');

    console.log(userId, title, content, summary, link, thumbnail);

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

    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getStories = async (req, res, next) => {
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
          .limit(page * 30)
          .populate('userId', '-_id username');
      } else if (sort === 'newest') {
        stories = await Stories.find()
          .sort('-createdAt')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', '-_id username');
      }
    } else {
      categoryId = await Categories.findOne()
        .where('title').equals(category)
        .select('_id');

      console.log(categoryId);

      if (sort === 'hottest') {
        stories = await Stories.find()
          .where('categoryId').equals(categoryId._id)
          .where('createdAt').gt(new Date(Date.now() - 24 * 60 * 60 * 1000))
          .sort('-like')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', '-_id username');
      } else if (sort === 'newest') {
        stories = await Stories.find()
          .where('categoryId').equals(categoryId._id)
          .sort('-createdAt')
          .skip((page - 1) * 30)
          .limit(page * 30)
          .populate('userId', '-_id username');
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
    });

    res.json({
      stories,
      page
    });
  } catch (err) {
    console.error(err);
    return next(createError(500));
  }
};

module.exports = {
  createStory,
  getStories,
  searchStories
};

const createError = require('http-errors');
const Categories = require('../models/Category');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find({}, 'title');

    res.json({
      categories
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

// should remove before deploy
const _createCategories = async (req, res, next) => {
  const categories = req.body.items;

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
};

module.exports = {
  getCategories,
  _createCategories
};

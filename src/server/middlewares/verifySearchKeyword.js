const createError = require('http-errors');

const verifySearchKeyword = (req, res, next) => {
  try {
    let keyword = req.query.keyword;

    if (keyword.match(/[^a-zA-Z0-9\s]|\s\s/)) {
      keyword = keyword.replace(/[^a-zA-Z0-9\s]/g, '');
      keyword = keyword.replace(/\s\s/g, ' ');

      console.log('invalid character is mutated', keyword);
    }

    if (typeof keyword === 'undefined' || keyword.trim().length < 2) {
      console.log('invalid character input, terminate search', keyword);
      return next(createError(400));
    }

    const page = req.query.page || 1;

    res.locals.page = page;
    res.locals.keyword = keyword;
    next();
  } catch (err) {
    console.error(err);
    return next(createError(400));
  }
};

module.exports = verifySearchKeyword;

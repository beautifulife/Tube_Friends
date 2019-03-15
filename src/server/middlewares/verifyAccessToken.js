const createError = require('http-errors');

const verifyAccessToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    res.locals.accessToken = bearerToken;
    next();
  } else {
    next(createError(403));
  }
};

module.exports = verifyAccessToken;

const createError = require('http-errors');
const Stories = require('../models/Story');
const Users = require('../models/User');

const authenticateUser = async (req, res, next) => {
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
};

const getFeed = async (req, res, next) => {
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
};

module.exports = {
  authenticateUser,
  getFeed
};

const mongoose = require('mongoose');
const createError = require('http-errors');
const Stories = require('../models/Story');
const Users = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const { uid, displayName, photoURL, email, stsTokenManager } = req.body;

  if (!(uid && displayName && photoURL && email)) {
    return next(createError(400));
  }

  try {
    const user = await Users.findOne({ uid });

    if (user) {
      return res.json({
        user,
        accessToken: stsTokenManager.accessToken
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
      user: newUser,
      accessToken: stsTokenManager.accessToken
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

const getFeed = async (req, res, next) => {
  try {
    const uid = res.locals.uid;
    const user_id = req.params.user_id;
    const page = req.query.page || 1;

    if (!user_id) {
      return next(createError(400));
    }

    if (uid !== user_id) {
      return next(createError(403, `forbidden feed request occured ${user_id}`));
    }

    const user = await Users.findOne()
      .where('uid')
      .equals(uid)
      .select('_id subscribe');

    console.log(uid, user);

    const subscribeList = user.subscribe.map(
      userId => new mongoose.Types.ObjectId(userId)
    );
    console.log(subscribeList);

    const stories = await Stories.find()
      .where('userId')
      .in(subscribeList)
      .sort('-createdAt')
      .skip((page - 1) * 30)
      .limit(page * 30);

    res.json({
      uid,
      page,
      stories
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

const toggleSubscribe = async (req, res, next) => {
  try {
    const uid = res.locals.uid;
    const action = req.body.action;
    const targetUserId = req.params.target_user_id;
    const method = action === 'unsubscribe' ? '$pull' : '$push';

    const userId = await Users.findOne()
      .where('uid')
      .equals(uid)
      .select('_id');

    if (!userId) {
      return next(createError(400));
    }

    const targetUser = await Users.findOneAndUpdate(
      { _id: targetUserId },
      { [method]: { subscriber: userId._id } },
      { new: true }
    );

    // subscribe user
    const user = await Users.findOneAndUpdate(
      { _id: userId._id },
      { [method]: { subscribe: targetUser._id } },
      { new: true }
    );

    console.log(user, targetUser);
    if (!(user && targetUser)) {
      return next(createError(400));
    }

    res.json({
      subscribe: user.subscribe
    });
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

module.exports = {
  authenticateUser,
  getFeed,
  toggleSubscribe
};

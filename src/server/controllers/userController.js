const mongoose = require('mongoose');
const createError = require('http-errors');
const Stories = require('../models/Story');
const Users = require('../models/User');
const UserAssets = require('../models/UserAsset');

const authenticateUser = async (req, res, next) => {
  const { uid, displayName, photoURL, email } = req.body;

  if (!(uid && displayName && photoURL && email)) {
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

    const result = await newUser.save();
    console.log(result);

    const newUserAsset = new UserAssets({ userId: result._id });

    await newUserAsset.save();

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
  const user_id = req.params.user_id;
  const page = req.query.page || 1;

  if (!user_id) {
    return next(createError(400));
  }

  if (uid !== user_id) {
    return next(createError(403, `forbidden feed request occured ${user_id}`));
  }

  try {
    const user = await Users.findOne()
      .where('uid')
      .equals(uid)
      .select('_id');

    console.log(uid, user);

    const userAsset = await UserAssets.findOne()
      .where('userId')
      .equals(user._id)
      .select('-_id subscribe');

    const subscribeList = userAsset.subscribe.map(
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

const subscribeUser = async (req, res, next) => {
  const uid = res.locals.uid;
  const targetUsername = req.params.username;

  if (!targetUsername) {
    return next(createError(400));
  }

  try {
    const users = await Users.find()
      .or([{ uid }, { username: targetUsername }])
      .select('_id username');

    console.log(users);
    if (users.length !== 2) {
      return next(createError(403, `forbidden feed request occured ${users}`));
    }

    let targetUserId;
    let userId;

    if (users[0].username === targetUsername) {
      targetUserId = users[0]._id;
      userId = users[1]._id;
    } else {
      targetUserId = users[1]._id;
      userId = users[0]._id;
    }

    // subscribe user
    await UserAssets.findOneAndUpdate({ $push: { subscribe: targetUserId } })
      .where('userId')
      .equals(userId);

    // add subscriber
    await UserAssets.findOneAndUpdate({ $push: { subscriber: userId } })
      .where('userId')
      .equals(targetUserId);

    res.send();
  } catch (err) {
    console.error(err);
    next(createError(500));
  }
};

module.exports = {
  authenticateUser,
  getFeed,
  subscribeUser
};

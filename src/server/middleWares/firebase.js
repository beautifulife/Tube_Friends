const createError = require('http-errors');
const admin = require('firebase-admin');
const serviceAccount = require('../../../serviceAccountKey.json');

// https://www.youtube.com/watch?v=WtYzHTXHBp0
// https://www.youtube.com/watch?v=-OKrloDzGpU&t=577s
// firebase admin sdk

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tube-friends-a5730.firebaseio.com'
});

const verifyIdToken = async (req, res, next) => {
  const idToken = res.locals.accessToken;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    res.locals.uid = uid;
    next();
  } catch (err) {
    console.error('invalid token', err);
    next(createError(400));
  }
};

module.exports = { verifyIdToken };

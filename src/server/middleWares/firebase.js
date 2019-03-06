const createError = require('http-errors');
const admin = require('firebase-admin');
const serviceAccount = require('../../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tube-friends-a5730.firebaseio.com'
});

const verifyIdToken = (req, res, next) => {
  const idToken = req.accessToken;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      const uid = decodedToken.uid;

      req.uid = uid;
      next();
    })
    .catch(err => {
      console.error('invalid token', err);
    });
};

module.exports = { verifyIdToken };

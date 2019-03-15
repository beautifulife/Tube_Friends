const createError = require('http-errors');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  "type": "service_account",
  "project_id": "tube-friends-a5730",
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6gthc%40tube-friends-a5730.iam.gserviceaccount.com"
};

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
    next(createError(403));
  }
};

module.exports = { verifyIdToken };

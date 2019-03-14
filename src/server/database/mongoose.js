const mongoose = require('mongoose');
require('dotenv').config();

const { DB_URI } = process.env;

mongoose.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success db connect');
});

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

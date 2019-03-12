const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  photoURL: { type: String, required: true },
  subscriber: [{ type: ObjectId, ref: 'User' }],
  subscribe: [{ type: ObjectId, ref: 'User' }],
  stories: [{ type: ObjectId, ref: 'Story' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

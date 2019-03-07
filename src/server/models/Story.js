const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const storySchema = mongoose.Schema({
  userId: { type: ObjectId, ref: 'User' },
  categoryId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  link: { type: ObjectId, required: true },
  like: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  thumbnail: { type: String, required: true }
});

module.exports = mongoose.model('Story', storySchema);

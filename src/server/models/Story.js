const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const storySchema = mongoose.Schema({
  userId: { type: ObjectId, required: true, ref: 'User' },
  categoryId: { type: ObjectId, required: true, ref: 'Category' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  link: { type: String, required: true },
  like: { type: Number, default: 0 },
  thumbnail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);

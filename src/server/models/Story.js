const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const storySchema = mongoose.Schema({
  uid: { type: String, required: true, ref: 'User' },
  categoryId: { type: String, required: true, ref: 'Category' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  link: { type: String, required: true },
  like: [{ type: ObjectId, ref: 'User' }],
  thumbnail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);

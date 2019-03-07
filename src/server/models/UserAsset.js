const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const userAssetSchema = mongoose.Schema({
  userId: { type: ObjectId, ref: 'User' },
  subscriber: [{ type: ObjectId, ref: 'User' }],
  subscribe: [{ type: ObjectId, ref: 'User' }],
  stories: [{ type: ObjectId, ref: 'Story' }]
});

module.exports = mongoose.model('UserAsset', userAssetSchema);

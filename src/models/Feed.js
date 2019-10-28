const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FeedSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
});
FeedSchema.plugin(mongoosePaginate);
module.exports = mongoose.model ('Feed', FeedSchema);
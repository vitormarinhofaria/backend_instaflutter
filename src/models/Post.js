const mongoose = require('mongoose');
const {User} = require('./Users');

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String, 
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: false,
  },
  liked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    body: {
      type: String,
      required: true,
    },
    commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
});

module.exports = mongoose.model("Post", PostSchema);
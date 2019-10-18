const mongoose = require('mongoose');
const {Post} = require('./Post');

const UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
},{timestamps: true}
);

module.exports = mongoose.model ('User', UserSchema);
const Post = require('../models/Post');
const User = require('../models/Users');
const Feed = require('../models/Feed');

module.exports = {
  async store(req, res){
    const {location: url = ''} = req.file;
    const userId = req.userId;
    const post = await Post.create({
      name: req.file.originalname,
      size: req.file.size,
      key: req.file.filename,
      url,
      postedBy: userId,
    });
    const user = await User.findById(userId);
    if(user){
      user.posts.push(post._id);
      await user.save();
      for(i = 0; i < user.followers.length; i++){
        let follower = await User.findById(user.followers[i]);
        follower.feed.push(post._id);
        follower.save();
      }
    }
    console.log(post);
    return res.json(post);
  },

  async listFeed(req, res){
    const userId = req.userId;

    let perPage = 10;
    let page = Math.max(0, req.query.page);

    const feed = await User.findById(userId, 'feed').populate([{
      path: 'feed',
      populate: {
        path: 'postedBy',
        select: 'username',
      },
      options: {
        sort: {createdAt: -1},
        skip: (perPage * page),
        limit: perPage,
      }
    }])

    return res.json(feed.feed);
  }
};
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

  async listFollowing(req, res){
    const userId = req.userId;

    const loggedUser = await User.findById(userId);
    const options = {
      select: 'posts',
      page: 1,
      limit: 10,
      populate: 'posts', sort: {createdAt: -1}, paginate: {page: 1, limit: 10},
    }

    let posts = await User.find({_id: loggedUser.following}, 'posts').populate('posts');
    //let posts = await User.paginate({}, options);
    let response = [];

    for(i = 0; i < posts.docs.length; i++){
      for(a = 0; a < posts.docs[i].posts.length; a++){
        response.push(posts.docs[i].posts[a]);
      }
    }

    return res.json(response);
  },
  async listFeed(req, res){
    const userId = req.userId;

    const options = {
      select: 'feed',
      page: 1, limit: 10,
      populate: {path: 'feed', options: {
        sort: {createdAt: -1},
        offset: 5,
        limit: 10
      }}, 
      //sort:{createdAt: -1},
    }

    //const feed = await User.paginate({_id: userId}, options);
    let perPage = 10;
    let page = Math.max(0, req.query.page)
    const feed = await User.findById(userId, 'feed').populate([{
      path: 'feed',
      options: {
        sort: {createdAt: -1},
        skip: (perPage * page),
        limit: perPage,
      }
    }])

    return res.json(feed);
  }
};
const Post = require('../models/Post');
const User = require('../models/Users');

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
    }
    
    console.log(user);
    return res.json(post);
  },

  async listFollowing(req, res){
    const userId = req.userId;

    const loggedUser = await User.findById(userId);

    let posts = await User.find({_id: loggedUser.following}, 'posts').populate('posts');

    let response = [];

    for(i = 0; i < posts.length; i++){
      for(a = 0; a < posts[i].posts.length; a++){
        response.push(posts[i].posts[a]);
      }
    }

    return res.json(response);
  }
};
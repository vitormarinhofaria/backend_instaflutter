const Post = require('../models/Post');
const User = require('../models/Users');

module.exports = {
  async store(req, res){
    const {location: url = ''} = req.file;
    const {userId} = req.params;
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
};
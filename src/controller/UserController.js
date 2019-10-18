const User = require('../models/Users');
const Post = require('../models/Post');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/jwt.json');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {

  async store(req, res){
    const {name, email, password, username} = req.body;
    
    const hashPass = md5(password);
    let response;
    const userExists = await User.findOne({email});
    const userNameExists = await User.findOne({username});

    if(userExists || userNameExists){
      if(userExists){
        response = {error: "This email is already on use"};
      }else{
        response = {error: "This username is already on use"};
      }
      
    }else{
      const CreateUser = await User.create({
        username,
        name,
        email,
        password: hashPass,
      });
      const token = generateToken({id: CreateUser._id})
      response = {token: `Bearer ${token}`}
    }
    return res.json(response);
  },

  async login(req, res){
    let {email, password} = req.body;
    password = md5(password);

    let auth;

    let user = await User.findOne({email});

    if(!user){
      auth = {error: "User not found"};
    }else{
      if(user.password != password){
        auth = {error: "Invalid password"};
      }else{
        auth = generateToken({id: user._id});
      }
    }
    
    return res.json(auth);
  },

  async listPosts(req, res){
    const userId = req.userId;

    const response = await Post.find({postedBy: userId});

    return res.json(response);
  },

  async followUser(req, res){
    const userId = req.userId;
    const {followedId} = req.params;

    const loggedUser = await User.findById(userId);

    const followedUser = await User.findById(followedId);

      loggedUser.following.push(followedUser._id);
      followedUser.followers.push(loggedUser._id);
      await loggedUser.save();
      await followedUser.save();

    return res.json({message: "success"});
  }
};
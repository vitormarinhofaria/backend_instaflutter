const User = require('../models/Users');
const md5 = require('md5');

module.exports = {
  async store(req, res){
    const {name, email, password} = req.body;
    
    const hashPass = md5(password);

    const CreateUser = await User.create({
      name,
      email,
      password: hashPass,
    });
    return res.json(CreateUser);
  },
};
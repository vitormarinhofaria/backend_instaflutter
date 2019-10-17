const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const PostController = require('./controller/PostController');
const UserController = require('./controller/UserController');

routes.get("/", (req, res) => {
  return res.json({message: "Olá mundo"})
});

routes.post("/posts/:userId/", multer(multerConfig).single('file'), PostController.store);

routes.post("/user", UserController.store);

module.exports = routes;
const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const PostController = require('./controller/PostController');
const UserController = require('./controller/UserController');

const authMiddleware = require('./middlewares/auth');

routes.use(authMiddleware);

routes.get("/", (req, res) => {
  return res.json({message: "Olá mundo"})
});

routes.post("/users/post", multer(multerConfig).single('file'), PostController.store);
routes.get("/users/posts", UserController.listPosts);
routes.post("/users/:followedId/follow", UserController.followUser);


module.exports = routes;
const auth_routes = require('express').Router();
const UserController = require('./controller/UserController');

auth_routes.post("/user", UserController.store);
auth_routes.post("/user/login", UserController.login);

module.exports = auth_routes;
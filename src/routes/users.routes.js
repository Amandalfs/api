const { Router } = require("express");
const usersRoutes = Router();

const multer = require('multer');
const uploadConfig = require('../config/upload');
const upload = multer(uploadConfig.MULTER);

const UsersController = require('../controllers/UsersController');
const usersController = new UsersController;

const UsersAvatarController = require("../controllers/UsersAvatarController");
const usersAvatarController = new UsersAvatarController;
  
const ensureAuthenticated = require("../middleweres/ensureAuthenticated");

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);


module.exports = usersRoutes;
const { Router } = require('express')
const usersRoutes = require('./users.route');
const notesRoutes = require('./notes.route');

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;
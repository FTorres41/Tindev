const express = require('express');
const devController = require('./controllers/devController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

const routes = express.Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.post('/devs/:id/likes', likeController.store);
routes.post('/devs/:id/dislikes', dislikeController.store);

module.exports = routes;
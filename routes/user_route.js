var express = require('express');
var user_route = express.Router();
var cors = require('cors');
const { requiresAuth } = require('express-openid-connect'); // Authentication

/** controller */
var saveController = require('../controller/user/save');
var getController = require('../controller/user/get');

/** route */
user_route.get('/get', requiresAuth(), getController.get);
user_route.post('/save', requiresAuth(), cors({ origin: true }), saveController.save);

module.exports = user_route;
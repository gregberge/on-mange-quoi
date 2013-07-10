var express = require('express'),
  mongoose = require('mongoose');

var config = require('./config'),
  routes = require('./routes');

// Express app
var app = express();

app.use(routes);

// Database
mongoose.connect(config.get('database:uri'));


module.exports = app;
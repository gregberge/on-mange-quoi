var express = require('express');

var foodMeetings = require('./food-meetings');

var app = express();

app.use('/food-meetings', foodMeetings);

module.exports = app;
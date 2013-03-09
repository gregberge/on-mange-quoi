var db = require('../db'),
mongoose = require('mongoose'),

pollSchema = new mongoose.Schema({
  email: String,
  venue: String,
  created: {type: Date, 'default': Date.now},
  foodMeeting: {type: mongoose.Schema.Types.ObjectId, ref: 'FoodMeeting'}
});

db.connect();

module.exports = exports = mongoose.model('Poll', pollSchema);
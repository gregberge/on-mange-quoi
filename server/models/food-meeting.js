var mongoose = require('mongoose'),
  crypto = require('crypto');

var userSchema = new mongoose.Schema({
  email: String,
  hash: String,
  lastSentDate: Date
});

var foodMeetingSchema = new mongoose.Schema({
  venues: mongoose.Schema.Types.Mixed,
  users: [userSchema],
  hash: String,
  created: {type: Date, 'default': Date.now}
});

var addUserHash = function (user) {
  var shasum = crypto.createHash('sha1');
  shasum.update(user.email);
  user.hash = shasum.digest('hex').substring(0, 5);
  return user;
};

var hashId = function (id) {
  var shasum = crypto.createHash('sha1');
  shasum.update(id + '');
  return shasum.digest('hex').substring(0, 5);
};

foodMeetingSchema.statics.hashUsers = function (users) {
  return users.map(addUserHash);
};

foodMeetingSchema.pre('save', function (next) {
  this.hash = hashId(this._id);
  this.users = foodMeetingSchema.statics.hashUsers(this.users);
  next();
});

module.exports = exports = mongoose.model('FoodMeeting', foodMeetingSchema);
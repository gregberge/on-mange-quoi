var db = require('../db'),
mongoose = require('mongoose'),
crypto = require('crypto'),
shasum,

userSchema = new mongoose.Schema({
  email: String,
  hash: String,
  lastSentDate: Date
}),

foodMeetingSchema = new mongoose.Schema({
  venues: mongoose.Schema.Types.Mixed,
  users: [userSchema],
  hash: String,
  created: {type: Date, 'default': Date.now}
});

foodMeetingSchema.statics.hashUsers = function (data) {
  // hash emails
  for (var i = data.users.length - 1; i >= 0; i--) {
    if (typeof data.users[i].hash === 'undefined') {
      shasum = crypto.createHash('sha1');
      shasum.update(data.users[i].email);
      data.users[i].hash = shasum.digest('hex').substring(0, 5);
    }
  }

  return data;
};

foodMeetingSchema.pre('save', function (next) {

  // hash id
  shasum = crypto.createHash('sha1');
  shasum.update('' + this._id);
  this.hash = shasum.digest('hex').substring(0, 5);

  next();
});

db.connect();

module.exports = exports = mongoose.model('FoodMeeting', foodMeetingSchema);
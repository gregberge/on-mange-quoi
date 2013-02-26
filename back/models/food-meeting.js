var mongoose = require('mongoose'),
crypto = require('crypto'),
shasum,

emailSchema = new mongoose.Schema({
  email: String,
  hash: String
}),

foodMeetingSchema = new mongoose.Schema({
  venues: mongoose.Schema.Types.Mixed,
  emails: [emailSchema],
  hash: String,
  created: {type: Date, default: Date.now}
});

foodMeetingSchema.statics.hashEmails = function (data) {
  // hash emails
  for (var i = data.emails.length - 1; i >= 0; i--) {
    if (typeof data.emails[i].hash === 'undefined') {
      shasum = crypto.createHash('sha1');
      shasum.update(data.emails[i].email);
      data.emails[i].hash = shasum.digest('hex').substring(0, 5);
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

module.exports = exports = mongoose.model('FoodMeeting', foodMeetingSchema);